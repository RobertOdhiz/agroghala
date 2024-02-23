#!/usr/bin/python3
"""
Contains the Profile Class
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Integer, ForeignKey
from sqlalchemy.orm import relationship
from os import environ

storage_engine = environ.get("AG_TYPE_STORAGE")


class Profile(BaseModel, Base):
    """ Profile class that inherits from BaseModel """
    if storage_engine == 'db':
        __tablename__ = 'profiles'
        phone_number = Column(String(10), nullable=True)
        location = Column(String(255), nullable=True)
        user_id = Column(String(60), ForeignKey('users.id'), nullable=False)
    else:
        phone_number = ""
        location = ""
        user_id = ""
