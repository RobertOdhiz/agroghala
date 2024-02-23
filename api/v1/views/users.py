#!/usr/bin/python3
"""
Module that contains the register an dlogin views
"""
from flask import abort, jsonify, request
from api.v1.views import app_views
from models.user import User
from models.token import Token, ExpiredToken
from models import storage
from datetime import datetime


@app_views.route('/auth/register', strict_slashes=False, methods=['POST'])
def register_user():
    """ """
    data = request.get_json()

    if not data:
        abort(400, description="Missing data")

    if not data.get('email'):
        abort(400, description="Email is required")

    users = storage.all(User).values()
    
    for user in users:
        if user.email == data['email']:
            abort(400, description="User with this email already exists")

    if not data.get('password'):
        abort(400, description="Password is required")

    new_user = User(**data)
    new_user.save()

    user_dict = new_user.to_dict()
    user_dict.pop("password", None)

    return jsonify(user_dict), 201


@app_views.route('/auth/login', strict_slashes=False, methods=['POST'])
def login_user():
    """ """
    data = request.get_json()

    if not data:
        abort(400, description="Missing data")

    if not data.get('email'):
        abort(400, description="Email is required")

    if not data.get('password'):
        abort(400, description="Password is required")

    users = storage.all(User).values()

    for  user in users:
        if user.email == data['email']:
            if not user.verify_password(data['password']):
                abort(400, description="Password is incorrect")
            user_id = user.id
            existing_tokens = storage.all(Token).values()
            for token in existing_tokens:
                if token.user_id == user_id and token.expires_at > datetime.utcnow():
                    return jsonify(token.to_dict()), 200
                if token.expires_at < datetime.utcnow():
                    # Remove the expired token from the database afer adding it to the expired_tokens table
                    expired_token = ExpiredToken(token_id=token.id, expired_at=token.expires_at)
                    Token.delete(token)
                    Token.save()
                    expired_token.save()
            new_tokens = Token.create_token(user_id)
            new_tokens.save()
            return jsonify(new_tokens.to_dict()), 201

    abort(400, description="User not found")
