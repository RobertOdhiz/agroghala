#!/usr/bin/python3
"""
Contains the Commodity Class
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, Float, Boolean
from sqlalchemy.orm import relationship
from os import environ
from sqlalchemy.orm import validates

storage_engine = environ.get("AG_TYPE_STORAGE")

if storage_engine == 'db':
    from models.mysoko import mysoko_commodities


class Commodity(BaseModel, Base):
    """ Commodity class that inherits from BaseModel """
    if storage_engine == 'db':
        __tablename__ = 'commodities'
        name = Column(String(255), nullable=False)
        current_price = Column(Float, default=0.0)
        previous_price = Column(Float, default=0.0)
        on_demand = Column(Boolean, default=False)

        mysoko_commodities = relationship("Mysoko",
                secondary=mysoko_commodities,
                back_populates="commodities",
                overlaps="mysoko_commodities")

        @validates('current_price')
        def validate_current_price(self, key, value):
            """Validator to update previous_price when current_price changes"""
            self.previous_price = self.current_price
            return value
    else:
        name = ""
        current_price = 0.0
        previous_price = 0.0
        on_demand = False
