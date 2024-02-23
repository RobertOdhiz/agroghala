#!/usr/bin/python3
"""
Contains the Warehouse Class
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Float, Boolean
from os import environ

storage_engine = environ.get("AG_TYPE_STORAGE")


class Warehouse(BaseModel, Base):
    """ Warehouse class that inherits from BaseModel """
    if storage_engine == 'db':
        __tablename__ = 'warehouses'
        name = Column(String(255), nullable=False)
        location = Column(String(255), nullable=False)
        rent_price = Column(Float, default=0.0)
        on_demand = Column(Boolean, default=False)
    else:
        name = ""
        location = ""
        rent_price = 0.0
        on_demand = False
