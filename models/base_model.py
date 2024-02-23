#!/usr/bin/python3
"""
Contains the BaseModel where all classes will inherit from
"""
from uuid import uuid4
from datetime import datetime
import models
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine, Column, Integer, String, DateTime
from os import environ

time = "%Y-%m-%dT%H:%M:%S.%f"

storage_engine = environ.get("AG_TYPE_STORAGE")

if storage_engine == 'db':
    Base = declarative_base()
else:
    Base = object


class BaseModel:
    """ """
    id = Column(String(60), primary_key=True, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow())
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow())

    def __init__(self, *args, **kwargs):
        """ Initializes the BaseModel """
        if kwargs:
            for key, value in kwargs.items():
                if key == 'created_at' or key == 'updated_at':
                    setattr(self, key, datetime.strptime(value, '%Y-%m-%dT%H:%M:%S.%f'))
                elif '__class__' == key:
                    pass
                else:
                    setattr(self, key, value)
            if kwargs.get("id", None) is None:
                self.id = str(uuid4())
        else:
            self.id = str(uuid4())
            self.created_at = datetime.utcnow()

    def __str__(self):
        """ Returns the formal representation of this instance """
        return f'[{self.__class__.__name__}] ({self.id}) {self.__dict__}'

    def __repr__(self):
        """ Return the string representation """
        return self.__str__()

    def to_dict(self, F_St=False):
        """ returns a dictionary containing all keys/values of __dict__ of the instance """
        new_dict = self.__dict__.copy()
        if "created_at" in new_dict:
            new_dict["created_at"] = new_dict["created_at"].strftime(time)
        if "updated_at" in new_dict:
            new_dict["updated_at"] = new_dict["updated_at"].strftime(time)
        if "_sa_instance_state" in new_dict:
            del new_dict["_sa_instance_state"]
        new_dict["__class__"] = self.__class__.__name__
        return new_dict

    def save(self):
        """ Saves an instance """
        self.updated_at = datetime.now()
        models.storage.new(self)
        models.storage.save()

    def delete(self):
        """ delete the current instance from the storage
        """
        key = "{}.{}".format(type(self).__name__, self.id)
        del models.storage.__objects[key]
