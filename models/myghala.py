#!/usr/bin/python3
"""
Contains the Myghala Class
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Boolean, ForeignKey, DateTime
from datetime import datetime
from sqlalchemy.orm import relationship
from os import environ

storage_engine = environ.get("AG_TYPE_STORAGE")


class Myghala(BaseModel, Base):
    """ Myghala class that inherits from BaseModel """
    if storage_engine == 'db':
        __tablename__ = 'myghalas'
        user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
        ghala_id = Column(String(60), ForeignKey("warehouses.id"), nullable=False)
        commodity_id = Column(String(60), ForeignKey("commodities.id"), nullable=False)
        date_rented = Column(DateTime, nullable=False, default=datetime.utcnow())
        picked = Column(Boolean, nullable=False, default=False)
        date_picked = Column(DateTime, nullable=True)

        user = relationship('User', backref='myghalas', lazy=True)
        warehouse = relationship('Warehouse', backref='myghalas', lazy=True)
        commodity = relationship('Commodity', backref='myghalas', lazy=True)

        @staticmethod
        def set_date_picked(mapper, connection, target):
            """Set date_picked to current datetime if picked is changed to True"""
            if not target.date_picked and target.picked:
                target.date_picked = datetime.utcnow()
    else:
        user_id = ""
        ghala_id = ""
        date_rented = ""
        commodity_id = ""
        picked = False
        date_picked = ""
