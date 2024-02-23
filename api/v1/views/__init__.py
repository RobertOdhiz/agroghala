#!/usr/bin/python3
""" Initializes views """
from flask import Blueprint

app_views = Blueprint("app_views", __name__, url_prefix="/api/v1")


from api.v1.views.blogs import *
from api.v1.views.users import *
from api.v1.views.commodities import *
from api.v1.views.warehouses import *
from api.v1.views.profiles import *
from api.v1.views.count_objects import *
from api.v1.views.mysokos import *
