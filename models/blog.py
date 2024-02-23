#!/usr/bin/python3
"""
Contains the Blog Class
"""
from models.base_model import BaseModel, Base
from sqlalchemy.orm import relationship
from sqlalchemy import Column, String, ForeignKey, Integer, Text
from os import environ

storage_engine = environ.get("AG_TYPE_STORAGE")


class Blog(BaseModel, Base):
    """ Blog class that inherits from BaseModel """
    if storage_engine == 'db':
        __tablename__ = "blogs"
        title = Column(String(255), nullable=False)
        content = Column(Text, nullable=False)
        author = Column(String(60), ForeignKey("users.id"), nullable=False)
        reads = Column(Integer, default=0)
    else:
        title = ""
        content = ""
        author = ""
        reads = 0
