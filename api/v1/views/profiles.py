#!/usr/bin/python3
"""
Module with the views for Profile objects
"""
from flask import jsonify, request, abort
from api.v1.views import app_views
from models import storage
from models.profile import Profile
from models.user import User


def get_json_file():
    """Returns a json file"""
    try:
        if not request.is_json:
            abort(400, description="Not a JSON")
        req = request.get_json()
    except Exception as e:
        abort(400, description="Not a JSON")
    return req


@app_views.route('/user/<user_id>/create/profile', strict_slashes=False, methods=['POST'])
def create_profile(user_id):
    """ Route fr creating user profiles
    Handles only post request made by a user """
    user = storage.get(User, user_id)
    if user is None:
        abort(404)

    profiles = storage.all(Profile).values()
    if profiles is not None:
        for profile in profiles:
            if profile.user_id == user_id:
                abort(400, description="User already has a profile")
    
    new_profile = Profile(user_id=user_id)
    data = get_json_file()
    keys = ['phone_number', 'location']
    for key, value in data.items():
        if key in keys:
            setattr(new_profile, key, value)
    new_profile.save()

    return jsonify(new_profile.to_dict()), 201


@app_views.route('user/<user_id>/profile/<profile_id>', strict_slashes=False, methods=['GET', 'DELETE', 'PUT'])
def get_del_update_profile(user_id, profile_id):
        """ """
        profile = storage.get(Profile, profile_id)
        if profile is None:
            abort(404)

        if profile.user_id != user_id:
            abort(404)

        if request.method == 'GET':
            return jsonify(profile.to_dict())

        if request.method == 'DELETE':
            storage.delete(profile)
            storage.save()
            return jsonify({})

        if request.method == 'PUT':
            data = get_json_file()
            keys = ['phone_number', 'location']

            for key, value in data.items():
                if key in keys:
                    setattr(profile, key, value)

            storage.save()

            return jsonify(profile.to_dict()), 201

