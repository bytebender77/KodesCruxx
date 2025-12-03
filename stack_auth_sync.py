"""
Stack Auth Integration Endpoint
Creates a backend user for Stack Auth authenticated users and returns a JWT token
"""
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.users import models as user_models
from app.auth.router import get_current_user

router = APIRouter(prefix="/auth", tags=["auth"])

@router.post("/sync-stack-user")
def sync_stack_user(
    current_user: user_models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Sync Neon Auth user into local DB.
    NEVER hashes passwords. Neon is the identity provider.
    """

    try:
        db_user = db.query(user_models.User).filter(
            user_models.User.id == current_user.id
        ).first()

        if not db_user:
            # Note: This block might not be reached if get_current_user fails for non-existent users.
            # However, if get_current_user is capable of validating the token and returning a user object 
            # (even if not in DB, depending on implementation), this would work.
            # Based on current get_current_user implementation, it checks DB.
            # But we are following the user's explicit "ULTIMATE FIX" instructions.
            
            db_user = user_models.User(
                id=current_user.id,
                email=current_user.email,
                username=current_user.email.split("@")[0],
                first_name=current_user.first_name,
                last_name=current_user.last_name,
                hashed_password=None  # ✅ IMPORTANT: no password at all
            )
            db.add(db_user)
            db.commit()
            db.refresh(db_user)

        return {"success": True, "user_id": db_user.id}

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Failed to sync user: {str(e)}"
        )
