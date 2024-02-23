#!/usr/bin/python3
"""
Defines a module that Creates a new view for Myghala object
that handles all default RESTful API actions
"""
from flask import jsonify, abort, request
from api.v1.views import app_views
from models.myghala import Myghala
from models.user import User
from models.warehouse import Warehouse
from models import storage



def get_json_file():
    """ Method that returns a JSON file """
    try:
        if not request.is_json:
            abort(400, description="Not a JSON")
        req = request.get_json()
    except Exception as e:
        abort(400, description="Not a JSON")
    return req


def get_class_obj_dict(cls):
    """ Returns a dictionary of Class objects"""
    objs = list(storage.all(cls).values())
    objs_dict = [obj.to_dict() for obj in objs]
    return objs_dict


@app_views.route('/myghalas', strict_slashes=False, methods=['GET'])
def all_myghalas():
    """ Gets all Myghala objects in database """
    myghalas = get_class_obj_dict(Myghala)
    return jsonify(myghalas)


@app_views.route('user/<user_id>/myghalas', strict_slashes=False, methods=['GET'])
def get_myghalas(user_id):
    """ Gets all Myghala objects for specific user """
    user = storage.get(User, user_id)

    if not user:
        abort(404, description="No user found")
    myghalas = storage.all(Myghala).values()
    owned_myghalas = []
    for myghala in myghalas:
        if myghala.user_id == user_id:
            owned_myghalas.append(myghala.to_dict())
    if owned_myghalas is None:
        abort(404, description="You have not rented any ghalas yet.")
    return jsonify(owned_myghalas), 200


@app_views.route('user/<user_id>/myghalas/<myghala_id>', strict_slashes=False, methods=['GET', 'DELETE', 'PUT'])
def edit_delete_myghala(user_id, myghala_id):
    """ Gets a single ghala object or deletes it for a specific user """
    myghala = storage.get(Myghala, myghala_id)
    if myghala is None:
        abort(404)

    if myghala.user_id is not user_id:
        abort(400, description='You are not the owner of this myghala')

    if request.method == 'GET':
        return jsonify(myghala.to_dict())

    if request.method == 'DELETE':
        storage.delete(myghala)
        storage.save()
        return jsonify({}), 200i

    if request.method == 'PUT':
        data = get_json_file()
        myghalas = storage.all(Myghala).values()
        for myghala in myghalas:
            if myghala.id == myghala_id:
                if myghala.user_id == user_id:
                    keys = ['picked']

                    for key, value in data.items():
                        if key in keys:
                            setattr(myghala, key, value)
                    return jsonify(myghala.to_dict())
                else:
                    abort(400, description="You have not rented this warehouse")
        abort(404, description="No myghala found for this user")

@app_views.route('user/<user_id>/myghalas/<warehouse_id>', strict_slashes=False, methods=['POST'])
def post_myghalas(user_id, warehouse_id):
    """ Creates a new Myghala object """
    user = storage.get(User, user_id)

    if not user:
        abort(404, description='User not found')

    ghala = storage.get(Warehouse, warehouse_id)

    if not ghala:
        abort(404, description='Rented Warehouse not found')
    if request.method == 'POST':
        data = get_json_file()

        if not data.get('commodity_id'):
            abort(400, description="Commodity to be stored required")

        new_myghala = Myghala(user_id=user_id, ghala_id=warehouse_id)
        keys = ['commodity_id']

        for key, value in data.items():
            if key in keys:
                setattr(new_myghala, key, value)

        new_myghala.save()
        return jsonify(new_myghala.to_dict())
