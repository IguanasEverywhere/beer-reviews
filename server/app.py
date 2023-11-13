#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, render_template, session
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Beer


# Views go here!
# needed so server can serve up each of these resources directly
@app.route('/')
@app.route('/beers')
@app.route('/new')
@app.route('/login')
@app.route('/logout')
def index(id=0):
    return render_template("index.html")


class SignUp(Resource):

    def post(self):
        request_json_data = request.get_json()

        username = request_json_data.get('username')
        password = request_json_data.get('password')

        new_user = User(
            username=username,
            password=password
        )

        db.session.add(new_user)
        db.session.commit()

        response = make_response(new_user.to_dict(), 201)
        return response

class Login(Resource):
    def post(self):
        request_json_data = request.get_json()

        username = request_json_data.get('username')
        password = request_json_data.get('password')

        active_user = User.query.filter(User.username == username).first()

        if active_user.authenticate_user(password):
            session['active_user_id'] = active_user.id
            session['active_user_username'] = active_user.username
            response = make_response(active_user.to_dict(), 200)
        else:
            response = make_response({'Login Error': 'Login Failed'}, 401)

        return response

class Logout(Resource):
    def delete(self):
        print(session)
        session['active_user_id'] = None
        session['active_user_username'] = None
        print(session)
        # return something so page redirects?

class AllBeers(Resource):
    def get(self):
        beers = [beer.to_dict() for beer in Beer.query.all()]
        response = make_response(beers, 200)
        return response

class NewReview(Resource):
    def get(self):
        if session.get('active_user_id'):
            response = make_response({"LoginOk": "LoggedIn"}, 200)
        else:
            response = make_response({"Error": "Not Logged In"}, 401)
        return response

class CheckLoggedInStatus(Resource):
    def get(self):
        if session.get('active_user_id'):
            #print(session)
            response = make_response({"ActiveUser": session}, 200)
        else:
            response = make_response({"Error": "Not Logged In"}, 401)
        return response




api.add_resource(AllBeers, '/api/beers')
api.add_resource(SignUp, '/api/signup')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(NewReview, '/api/new')
api.add_resource(CheckLoggedInStatus, '/api/checkloginstatus')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

