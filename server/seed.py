#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Beer

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        users = []
        beers = []

        User.query.delete()
        username = fake.first_name()

        user = User(
            username=username
        )

        users.append(user)

        beer1 = Beer(
            name="Boston Lager",
            beer_type="Lager",
            brewery="Sam Adams"
        )
        beer2 = Beer(
            name="Ellie's Brown",
            beer_type="Brown Ale",
            brewery="Avery"
        )
        beer3 = Beer(
            name="1554",
            beer_type="Black Lager",
            brewery="New Belgium"
        )

        beers.append(beer1)
        beers.append(beer2)
        beers.append(beer3)

        db.session.add_all(users)
        db.session.add_all(beers)

        db.session.commit()
        print("Seeded!")

