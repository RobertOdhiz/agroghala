#!/usr/bin/python3
"""
Contains the Mysoko Class
"""
from models.base_model import BaseModel, Base
from sqlalchemy import Column, String, ForeignKey, Table, Integer
from sqlalchemy.orm import relationship
from os import environ

storage_engine = environ.get("AG_TYPE_STORAGE")

if storage_engine == 'db':
    mysoko_commodities = Table('mysoko_commodities', Base.metadata,
                               Column('id', Integer, primary_key=True, autoincrement=True),
                               Column('mysoko_id', String(60),
                                      ForeignKey('mysokos.id'),
                                      nullable=False),
                               Column('commodity_id', String(60),
                                      ForeignKey('commodities.id'),
                                      nullable=False))


class Mysoko(BaseModel, Base):
    """ Mysoko class that inherits from BaseModel """
    if storage_engine == 'db':
        __tablename__ = 'mysokos'
        user_id = Column(String(60), ForeignKey("users.id"), nullable=False)
        commodities = relationship('Commodity',
                secondary=mysoko_commodities,
                backref='mysokos',
                overlaps="mysokos")

        user = relationship("User", backref="mysokos")
    else:
        user_id = ""
        commodities = []

    def to_dict(self):
        """ Returns a dictionary representation of the Mysoko object. """
        new_dict = super().to_dict()

        new_dict['commodities'] = [commodity.to_dict() for commodity in self.commodities]

        return new_dict
