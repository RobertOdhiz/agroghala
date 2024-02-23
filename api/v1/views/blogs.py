#!/usr/bin/python3
"""
Defines a module that Creates a new view for Blog object
that handles all default RESTful API actions
"""
from flask import jsonify, abort, request
from api.v1.views import app_views
from models.blog import Blog
from models.user import User
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


@app_views.route('/blogs', strict_slashes=False, methods=['GET', 'POST'])
def get_blogs():
    """ Gets all blog posts of all Blog objects """
    blogs = list(storage.all(Blog).values())
    blogs_dict = [blog.to_dict() for blog in blogs]
    return jsonify(blogs_dict), 200

@app_views.route('/blogs/<blog_id>', strict_slashes=False, methods=['GET'])
def single_blog(blog_id):
    """ Gets a single blog post by id and allows all CRUD requests dependingon whether
    the author made the request """
    if request.method == 'GET':
        blog = storage.get(Blog, blog_id)

        if blog is None:
            abort(404)

        blog.reads += 1
        blog.save()
        return jsonify(blog.to_dict())


@app_views.route('user/<user_id>/blogs/<blog_id>', strict_slashes=False, methods=['GET', 'PUT', 'DELETE'])
def edit_delete_blog(blog_id):
    """ """
    blog = storage.get(Blog, blog_id)
    if blog is None:
        abort(404)

    if blog.author is not user_id:
        abort(400, description='You are not the author of this blog')

    if request.method == 'PUT':
        req = get_json_file()

        keys = ['title', 'content']

        for key, value in req.items():
            if key in keys:
                setattr(blog, key, value)

        blog.save()

        return jsonify(blog.to_dict()), 200

    if request.method == 'DELETE':
        storage.delete(blog)
        storage.save()
        return jsonify({})

@app_views.route('user/<user_id>/blogs', strict_slashes=False, methods=['POST'])
def post_blogs(user_id):
    """ Gets all blog posts of all Blog objects """
    if not user_id:
        abort(400, description="Author for blog required")
    req = get_json_file()
    if not req.get('title'):
        abort(400, description='Missing blog title')
    if not req.get('content'):
        abort(400, description='Missing blog Content')
    blog = Blog(author=user_id, **req)

    blog.save()

    return jsonify(blog.to_dict()), 201
