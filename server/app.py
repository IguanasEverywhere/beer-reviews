#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, render_template
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Beer


# Views go here!
# other routes here?
@app.route('/')
def index(id=0):
    return render_template("index.html")

class AllBeers(Resource):
    def get(self):

        beers = [beer.to_dict() for beer in Beer.query.all()]
        response = make_response(beers, 200)
        return response



api.add_resource(AllBeers, '/api/beers')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

