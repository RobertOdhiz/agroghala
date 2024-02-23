#!/usr/bin/python3
"""
Module with the views for Warehouse objects
"""
from flask import jsonify, request, abort
from api.v1.views import app_views
from models import storage
from models.warehouse import Warehouse


def get_json_file():
    """Returns a json file"""
    try:
        if not request.is_json:
            abort(400, description="Not a JSON")
        req = request.get_json()
    except Exception as e:
        abort(400, description="Not a JSON")
    return req


@app_views.route('/warehouses', strict_slashes=False, methods=['GET', 'POST'])
def get_post_warehouses():
    """ """
    if request.method == 'GET':
        warehouses = list(storage.all(Warehouse).values())
        warehouses_dict = [warehouse.to_dict() for warehouse in warehouses]

        return jsonify(warehouses_dict), 200
    if request.method == 'POST':
        data = get_json_file()

        if not data.get('name'):
            abort(400, description="Warehouse name is required")

        if not data.get('rent_price'):
            abort(400, description="Warehouse rent price is required")

        warehouse = Warehouse(**data)
        warehouse.save()
        return jsonify(warehouse.to_dict()), 201

@app_views.route('/warehouses/<warehouse_id>', strict_slashes=False, methods=['GET', 'DELETE', 'PUT'])
def get_del_update_warehouse(warehouse_id):
        """ """
        if request.method == 'GET':
            warehouse = storage.get(Warehouse, warehouse_id)
            if warehouse is None:
                abort(404)
            return jsonify(warehouse.to_dict())

        if request.method == 'DELETE':
            warehouse = storage.get(Warehouse, warehouse_id)
            if warehouse is None:
                abort(404)
            storage.delete(warehouse)
            storage.save()
            return jsonify({})

        if request.method == 'PUT':
            warehouse = storage.get(Warehouse, warehouse_id)
            if warehouse is None:
                abort(404)

            data = get_json_file()
            keys = ['name', 'rent_price', 'on_demand']

            for key, value in data.items():
                if key in keys:
                    setattr(warehouse, key, value)

            storage.save()

            return jsonify(warehouse.to_dict()), 200

