#!/usr/bin/python3
"""
Module with the views for Commodity objects
"""
from flask import jsonify, request, abort
from api.v1.views import app_views
from models import storage
from models.commodity import Commodity


def get_json_file():
    """Returns a json file"""
    try:
        if not request.is_json:
            abort(400, description="Not a JSON")
        req = request.get_json()
    except Exception as e:
        abort(400, description="Not a JSON")
    return req


@app_views.route('/commodities', strict_slashes=False, methods=['GET', 'POST'])
def get_post_commodities():
    """ """
    if request.method == 'GET':
        commodities = list(storage.all(Commodity).values())
        commodities_dict = [commodity.to_dict() for commodity in commodities]

        return jsonify(commodities_dict), 200
    if request.method == 'POST':
        data = get_json_file()

        if not data.get('name'):
            abort(400, description="Commodity name is required")

        if not data.get('current_price'):
            abort(400, description="Commodity current price is required")

        commodity = Commodity(**data)
        commodity.save()
        return jsonify(commodity.to_dict()), 201

@app_views.route('/commodities/<commodity_id>', strict_slashes=False, methods=['GET', 'DELETE', 'PUT'])
def get_del_update_commodity(commodity_id):
        """ """
        if request.method == 'GET':
            commodity = storage.get(Commodity, commodity_id)
            if commodity is None:
                abort(404)
            return jsonify(commodity.to_dict())

        if request.method == 'DELETE':
            commodity = storage.get(Commodity, commodity_id)
            if commodity is None:
                abort(404)
            storage.delete(commodity)
            storage.save()
            return jsonify({})

        if request.method == 'PUT':
            commodity = storage.get(Commodity, commodity_id)
            if commodity is None:
                abort(404)

            data = get_json_file()
            keys = ['name', 'current_price', 'previous_price', 'on_demand']

            for key, value in data.items():
                if key in keys:
                    setattr(commodity, key, value)

            storage.save()

            return jsonify(commodity.to_dict()), 200

