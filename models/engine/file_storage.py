#!/usr/bin/python3
"""
Contains then FileStorage CLass
"""
import json
from models.base_model import BaseModel
from models.user import User
from models.commodity import Commodity
from models.blog import Blog
from models.warehouse import Warehouse


class FileStorage:
    """ FileStorage Class definition """
    __file_path = "file.json"
    __objects = {}
    classes = {
            "BaseModel": BaseModel,
            "User": User,
            "Blog": Blog,
            "Commodity": Commodity,
            "Warehouse": Warehouse
    }

    def all(self, cls=None):
        """ Returns all objects"""
        if (not cls):
            return self.__objects
        result = {}
        for key in self.__objects.keys():
            if (key.split(".")[0] == cls.__name__):
                result.update({key: self.__objects[key]})
        return result

    def new(self, obj):
        """ Creates in __objects the obj with the key <obj class name>.id """
        if obj:
            key = f'{obj.__class__.__name__}.{obj.id}'
            self.__objects[key] = obj

    def save(self):
        """ serializes __objects to the JSON file (path: __file_path) """
        temp_dict = {}

        for key, value in self.__objects.items():
            temp_dict[key] = value.to_dict()
        with open(self.__file_path, 'w', encoding='UTF-8') as f:
            json.dump(temp_dict, f)

    def reload(self):
        """ deserializes the json file to objects if it exists, otherwise do nothing """
        try:
            with open(self.__file_path, 'r', encoding='UTF-8') as f:
                reloaded_dict = json.load(f)
            for key, value in reloaded_dict.items():
                obj = self.classes[value['__class__']](**value)
                self.__objects[key] = obj
        except FileNotFoundError:
            pass

    def delete(self, obj=None):
        """
            delete obj from __objects if it’s inside - if obj is None,
            the method should not do anything
        """
        if (obj):
            self.__objects.pop("{}.{}".format(type(obj).__name__, obj.id))

    def get(self, cls, id):
        """retrieves and returns one object based on
           the class and its ID, or None """
        items = self.__objects.values()
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
            return len(list(self.__objects.values()))

    def close(self):
        """ Closes a session """
        self.reload()
