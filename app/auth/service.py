from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from app.users import repository as user_repo
from app.core import security

def authenticate_user(db: Session, email: str, password: str):
    user = user_repo.get_user_by_email(db, email)
    if not user:
        return False
    if not user.hashed_password: # OAuth users might not have password
        return False
    if not security.verify_password(password, user.hashed_password):
        return False
    return user

def create_tokens(user_id: str):
    access_token = security.create_access_token(subject=user_id)
    refresh_token = security.create_refresh_token(subject=user_id)
    return access_token, refresh_token
