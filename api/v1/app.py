#!/usr/bin/python3
""" Defines a module that calls app.py """
from flask import Flask, jsonify, make_response
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from api.v1.views import app_views
from models import storage
from os import getenv


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}})
app.register_blueprint(app_views)
app.config['JWT_SECRET_KEY'] = '1234567890'
jwt = JWTManager(app)


@app.teardown_appcontext
def clear_resource(exception=None):
    """Frees resources and close sessions"""
    storage.close()


@app.errorhandler(404)
def page_not_found(error):
    """ Handles 404 not found error """
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.errorhandler(400)
def bad_request(e):
    """ Handles 400 bad request error"""
    return jsonify(error=e.description), 400


if __name__ == "__main__":
    """ """
    app.run(debug=True, host='0.0.0.0', port=5000, threaded=True)
