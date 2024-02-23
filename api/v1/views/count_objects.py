#!/usr/bin/python3
"""
Module with object that returns the number of each object
"""
from models.user import User
from models.commodity import Commodity
from models.warehouse import Warehouse
from models.myghala import Myghala
from models.mysoko import Mysoko
from models.blog import Blog
from models import storage, dummy_classes
from flask import jsonify
from api.v1.views import app_views


@app_views.route('/count', strict_slashes=False, methods=['GET'])
def count_objs():
    """ Returns the total number of all classes """
    users = storage.count(User)
    commodities = storage.count(Commodity)
    warehouses = storage.count(Warehouse)
    myghalas = storage.count(Myghala)
    mysokos = storage.count(Mysoko)
    blogs = storage.count(Blog)

    all_classes = storage.count()

    response = {
            "all objects": all_classes,
            "users": users,
            "blogs": blogs,
            "commodities": commodities,
            "myghalas": myghalas,
            "mysokos": mysokos,
            "warehouses": warehouses
            }

    return jsonify(response), 200
