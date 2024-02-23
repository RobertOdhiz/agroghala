#!/usr/bin/python3
"""
Contains the User Class
"""
from models.base_model import BaseModel, Base
from os import environ
from sqlalchemy import Column, String, ForeignKey
from sqlalchemy.orm import relationship
import bcrypt

storage_engine = environ.get("AG_TYPE_STORAGE")

class User(BaseModel, Base):
    """ User class that inherits from BaseModel """
    if storage_engine == 'db':
        __tablename__ = 'users'
        first_name = Column(String(255), nullable=True)
        last_name = Column(String(255), nullable=True)
        email = Column(String(255), nullable=False)
        password = Column(String(255), nullable=False)

        blogs = relationship("Blog", backref="user", lazy=True)
        profile = relationship("Profile", backref='user', lazy=True)
        tokens = relationship("Token", backref='user', lazy=True)
    else:
        first_name = ""
        last_name = ""
        email = ""
        password = ""

    def __init__(self, *args, **kwargs):
        """Initialize a new User instance"""
        super().__init__(*args, **kwargs)

        if 'password' in kwargs:
            self.password = self.encrypt_password(kwargs['password'])

    def encrypt_password(self, plain_password):
        """Encrypts the given plain password using bcrypt"""
        salt = bcrypt.gensalt()
        hashed_password = bcrypt.hashpw(plain_password.encode('utf-8'), salt)
        return hashed_password.decode('utf-8')

    def verify_password(self, plain_password):
        """Verifies the given plain password against the stored hashed password"""
        return bcrypt.checkpw(plain_password.encode('utf-8'), self.password.encode('utf-8'))
