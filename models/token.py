#!/usr/bin/python3
"""
Module ith token class eponsible for creating access tokens for my users
"""
from models.base_model import BaseModel, Base
from flask_jwt_extended import create_access_token, create_refresh_token
from sqlalchemy import Column, Index, String, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from datetime import datetime, timedelta


class Token(BaseModel, Base):
    """ """
    __tablename__ = 'tokens'
    user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    access_token = Column(String(512), nullable=False, index=True)
    refresh_token = Column(String(512), nullable=False)
    expires_at = Column(DateTime, nullable=False)


    Index('ix_access_token', 'access_token', unique=True)


    @classmethod
    def create_token(cls, user_id):
        """Create and store a new access token and refresh token"""
        access_token = create_access_token(identity=str(user_id))
        refresh_token = create_refresh_token(identity=str(user_id))

        expires_at = datetime.utcnow() + timedelta(days=5)
        new_token = cls(user_id=user_id, access_token=access_token, refresh_token=refresh_token, expires_at=expires_at)
        return new_token


class ExpiredToken(BaseModel, Base):
    """ExpiredToken class for storing expired access tokens"""

    __tablename__ = 'expired_tokens'

    token_id = Column(String(60), ForeignKey('tokens.id'), nullable=False)
    expired_at = Column(DateTime, nullable=False)


    @classmethod
    def add_expired_token(cls, access_token, expires_at):
        """Add expired access token to the table"""
        expired_token = cls(access_token=access_token, expired_at=expires_at)
        expired_token.save()
