#!/usr/bin/python3
"""
Defines a module that Creates a new view for Mysoko object
that handles all default RESTful API actions
"""
from flask import jsonify, abort, request
from api.v1.views import app_views
from models.mysoko import Mysoko
from models.user import User
from models.commodity import Commodity
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


@app_views.route('/mysokos', strict_slashes=False, methods=['GET'])
def get_mysokos():
    """ Gets all mysoko posts of all Mysoko objects """
    mysokos = list(storage.all(Mysoko).values())
    mysokos_dict = [mysoko.to_dict() for mysoko in mysokos]
    return jsonify(mysokos_dict), 200

@app_views.route('user/<user_id>/mysokos', strict_slashes=False, methods=['GET'])
def get_mysokos_by_user(user_id):
    """ Gets all Mysoko objects for a specific user """
    user = storage.get(User, user_id)

    if not user:
        abort(404, description="No user found")
    mysokos = storage.all(Mysoko).values()
    owned_mysoko = []

    for mysoko in mysokos:
        if mysoko.user_id == user_id:
            owned_mysoko.append(mysoko)

    if owned_mysokko is None:
        abort(404, description="You have not sold anything yet")

    return jsonify(owned_mysoko), 200


@app_views.route('user/<user_id>/mysokos/<mysoko_id>', strict_slashes=False, methods=['GET', 'DELETE'])
def edit_delete_mysoko(user_id, mysoko_id):
    """ Gets and deletes a mysoko instance for a user """
    user = storage.get(User, user_id)

    if user is None:
        abort(404, description="No user found")

    mysoko = storage.get(Mysoko, mysoko_id)
    if mysoko is None:
        abort(404, description="No Mysoko found")

    if mysoko.user_id is not user_id:
        abort(400, description='You are not the owner of this mysoko')

    if request.method == 'GET':
        mysokos = storage.all(Mysoko, mysoko_id)
        for mysoko in mysokos:
            if mysoko.id == mysoko_id:
                return jsonify(mysoko.to_dict()), 200

        abort(404, description="Mysoko was not  found")

    if request.method == 'DELETE':
        storage.delete(mysoko)
        storage.save()
        return jsonify({}), 200

@app_views.route('user/<user_id>/mysokos/<commodity_id>', strict_slashes=False, methods=['POST','PUT'])
def post_mysokos(user_id, commodity_id):
    """ Creates a new Mysoko object """
    user = storage.get(User, user_id)

    if not user:
        abort(404, description='User not found')

    commodity = storage.get(Commodity, commodity_id)

    if not commodity:
        abort(404, description='Commodity not found')

    mysokos = storage.all(Mysoko).values()
    if not mysokos:
        abort(404, description="No mysokos found")

    if request.method == 'PUT':

        for mysoko in mysokos:
            if mysoko.user_id == user_id:
                mysoko.commodities.append(commodity)
                mysoko.save()
                return jsonify(mysoko.to_dict()), 201

        abort(404, description="No mysoko found for this user")

    if request.method == 'POST':
        for mysoko in mysokos:
            if mysoko.user_id == user_id:
                abort(400, description="This user already has a Mysoko")
        new_mysoko = Mysoko(user_id=user_id)
        new_mysoko.commodities.append(commodity)
        new_mysoko.save()

        return jsonify(new_mysoko.to_dict()), 201
