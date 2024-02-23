#!/usr/bin/python3
"""
Contains the DBStorage class
"""
import models
from models.base_model import BaseModel, Base
from os import environ, getenv
from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker
from sqlalchemy import create_engine

AG_MYSQL_USER = getenv('AG_MYSQL_USER')
AG_MYSQL_PWD = getenv('AG_MYSQL_PWD')
AG_MYSQL_HOST = getenv('AG_MYSQL_HOST')
AG_MYSQL_DB = getenv('AG_MYSQL_DB')


class DBStorage:
    """
    Database storage for mysql conversion
    """
    __engine = None
    __session = None

    def __init__(self):
        """
        Initializing the database storage
        """
        self.__engine = create_engine(f'mysql+mysqldb://{AG_MYSQL_USER}:{AG_MYSQL_PWD}@{AG_MYSQL_HOST}/{AG_MYSQL_DB}', pool_pre_ping=True)

        env = getenv('AG_ENV')
        if (env == "test"):
            Base.metadata.drop_all(self.__engine)

    def all(self, cls=None):
        """Query the current session and list all instances of cls
        """
        result = {}
        if cls:
            for row in self.__session.query(cls).all():
                key = "{}.{}".format(cls.__name__, row.id)
                row.to_dict()
                result.update({key: row})
        else:
            for table in models.dummy_tables:
                cls = models.dummy_tables[table]
                for row in self.__session.query(cls).all():
                    key = "{}.{}".format(cls.__name__, row.id)
                    row.to_dict()
                    result.update({key: row})
        return result

    def rollback(self):
        """rollback changes
        """
        self.__session.rollback()

    def new(self, obj):
        """add object to current session
        """
        self.__session.add(obj)

    def save(self):
        """commit current done work
        """
        self.__session.commit()

    def delete(self, obj=None):
        """delete obj from session
        """
        if (obj is None):
            self.__session.delete(obj)

    def reload(self):
        """reload the session
        """
        Base.metadata.create_all(self.__engine)
        Session = sessionmaker(bind=self.__engine, expire_on_commit=False)
        Scope = scoped_session(Session)
        self.__session = Scope

    def close(self):
        """display our HBNB data
        """
        self.__session.remove()

    def get(self, cls, id):
        """retrieves and returns one object based on
           the class and its ID, or None """
        items = self.all().values()
        obj = [item for item in items if isinstance(item, cls)
               and item.to_dict().get('id') == id]
        if obj:
            return obj[0]
        else:
            return None

    def count(self, cls=None):
        """Counts the number of objects in storage"""
        if cls:
            return len(list(self.all(cls).values()))
        else:
            return len(list(self.all().values()))
