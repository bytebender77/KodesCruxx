"""
Stack Auth Integration Endpoint
Creates a backend user for Stack Auth authenticated users and returns a JWT token
"""
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from auth import create_access_token
from app.core.database import get_db
from app.users.models import User
from sqlalchemy.orm import Session
from passlib.context import CryptContext
import secrets

router = APIRouter(prefix="/auth", tags=["auth"])
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

class StackUserSync(BaseModel):
    email: str
    stack_user_id: str
    display_name: str = ""

@router.post("/sync-stack-user")
def sync_stack_user(data: StackUserSync, db: Session = Depends(get_db)):
    """
    Sync a Stack Auth user with the backend database.
    Creates a new user if they don't exist, or returns existing user.
    Returns a JWT token for API access.
    """
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == data.email).first()
        
        if existing_user:
            # User exists, generate token
            access_token = create_access_token(data={"sub": existing_user.email})
            return {
                "access_token": access_token,
                "token_type": "bearer",
                "user": {
                    "id": existing_user.id,
                    "email": existing_user.email,
                    "first_name": existing_user.first_name,
                    "last_name": existing_user.last_name
                }
            }
        
        # Create new user
        # Extract first/last name from display_name
        name_parts = data.display_name.split(' ', 1) if data.display_name else ['User', '']
        first_name = name_parts[0] if len(name_parts) > 0 else 'User'
        last_name = name_parts[1] if len(name_parts) > 1 else ''
        
        # Generate username from email
        username = data.email.split('@')[0] + '_' + secrets.token_hex(4)
        
        # Create user with a random password (won't be used since auth is via Stack)
        random_password = secrets.token_urlsafe(32)
        hashed_password = pwd_context.hash(random_password)
        
        new_user = User(
            email=data.email,
            username=username,
            first_name=first_name,
            last_name=last_name,
            hashed_password=hashed_password,
            is_active=True,
            is_verified=True,
            auth_provider='stack'
        )
        
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        
        # Generate JWT token
        access_token = create_access_token(data={"sub": new_user.email})
        
        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": {
                "id": new_user.id,
                "email": new_user.email,
                "first_name": new_user.first_name,
                "last_name": new_user.last_name
            }
        }
        
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to sync user: {str(e)}")
