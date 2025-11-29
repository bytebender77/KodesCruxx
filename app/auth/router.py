from fastapi import APIRouter, Depends, HTTPException, status, Request, Response
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordRequestForm
from app.core.database import get_db
from app.users import schemas as user_schemas
from app.users import repository as user_repo
from app.auth import schemas as auth_schemas
from app.auth import service as auth_service
from app.auth.oauth import oauth
from app.core import security
from app.core.config import settings

router = APIRouter()

@router.post("/signup", response_model=auth_schemas.Token)
def signup(user: user_schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = user_repo.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    new_user = user_repo.create_user(db=db, user=user)
    access_token, refresh_token = auth_service.create_tokens(user_id=new_user.id)
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

@router.post("/login", response_model=auth_schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    # Note: OAuth2PasswordRequestForm expects 'username', but we use 'email'
    user = auth_service.authenticate_user(db, email=form_data.username, password=form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect email or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    access_token, refresh_token = auth_service.create_tokens(user_id=user.id)
    
    # Set refresh token in HTTPOnly cookie
    response = Response()
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=True, # Set to True in production (HTTPS)
        samesite="lax",
        max_age=settings.REFRESH_TOKEN_EXPIRE_DAYS * 24 * 60 * 60
    )
    
    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer"
    }

# --- OAuth Endpoints ---

@router.get("/google/login")
async def google_login(request: Request):
    redirect_uri = request.url_for('google_callback')
    return await oauth.google.authorize_redirect(request, redirect_uri)

@router.get("/google/callback")
async def google_callback(request: Request, db: Session = Depends(get_db)):
    try:
        token = await oauth.google.authorize_access_token(request)
        user_info = token.get('userinfo')
        if not user_info:
             user_info = await oauth.google.userinfo(token=token)
             
        email = user_info.get('email')
        first_name = user_info.get('given_name')
        last_name = user_info.get('family_name')
        provider_id = user_info.get('sub')
        
        # Check if user exists
        user = user_repo.get_user_by_email(db, email)
        if not user:
            user = user_repo.create_oauth_user(db, email, first_name, last_name, "google", provider_id)
        
        # Create tokens
        access_token, refresh_token = auth_service.create_tokens(user_id=user.id)
        
        # Redirect to frontend with tokens (or set cookie and redirect)
        # For simplicity, we'll return a JSON response, but in a real app you'd redirect
        # to a frontend route that handles the token storage.
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
             "user": {
                "email": user.email,
                "first_name": user.first_name
            }
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Google Auth Error: {str(e)}")

@router.get("/github/login")
async def github_login(request: Request):
    redirect_uri = request.url_for('github_callback')
    return await oauth.github.authorize_redirect(request, redirect_uri)

@router.get("/github/callback")
async def github_callback(request: Request, db: Session = Depends(get_db)):
    try:
        token = await oauth.github.authorize_access_token(request)
        resp = await oauth.github.get('user', token=token)
        user_info = resp.json()
        
        # GitHub emails might be private, need separate call
        email = user_info.get('email')
        if not email:
             emails_resp = await oauth.github.get('user/emails', token=token)
             emails = emails_resp.json()
             primary_email = next((e for e in emails if e['primary']), None)
             email = primary_email['email'] if primary_email else None

        if not email:
             raise HTTPException(status_code=400, detail="Could not retrieve email from GitHub")

        name_parts = (user_info.get('name') or '').split()
        first_name = name_parts[0] if name_parts else user_info.get('login')
        last_name = " ".join(name_parts[1:]) if len(name_parts) > 1 else ""
        provider_id = str(user_info.get('id'))
        
        user = user_repo.get_user_by_email(db, email)
        if not user:
            user = user_repo.create_oauth_user(db, email, first_name, last_name, "github", provider_id)
            
        access_token, refresh_token = auth_service.create_tokens(user_id=user.id)
        
        return {
            "access_token": access_token,
            "refresh_token": refresh_token,
            "token_type": "bearer",
            "user": {
                "email": user.email,
                "first_name": user.first_name
            }
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"GitHub Auth Error: {str(e)}")

# --- Get Current User from JWT ---

from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

async def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    
    user = user_repo.get_user(db, user_id=user_id)
    if user is None:
        raise credentials_exception
    return user

@router.get("/me", response_model=user_schemas.User)
async def read_users_me(current_user = Depends(get_current_user)):
    return current_user
