#!/usr/bin/python3
""" """
from models.engine.file_storage import FileStorage
from models.engine.db_storage import DBStorage
from models.base_model import BaseModel
from models.user import User
from models.blog import Blog
from models.commodity import Commodity
from models.warehouse import Warehouse
from models.mysoko import Mysoko
from models.myghala import Myghala
from models.profile import Profile
from models.token import Token, ExpiredToken
from os import environ

storage_engine = environ.get("AG_TYPE_STORAGE")

dummy_classes = {
        "BaseModel": BaseModel,
        "User": User,
        "Profile": Profile,
        "Blog": Blog,
        "Commodity": Commodity,
        "Warehouse": Warehouse,
        "Myghala": Myghala,
        "Mysoko": Mysoko,
        "Token":Token,
        "ExpiredTiken": ExpiredToken
}
dummy_tables = {
        "users": User,
        "profiles": Profile,
        "blogs": Blog,
        "commodities": Commodity,
        "warehouses": Warehouse,
        "myghalas": Myghala,
        "mysokos": Mysoko,
        "tokens": Token,
        "expired_tokens": ExpiredToken
        }
if storage_engine == 'db':
    storage = DBStorage()
    storage.reload()
else:
    storage = FileStorage()
    storage.reload()
