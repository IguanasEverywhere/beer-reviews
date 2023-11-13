#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Beer, Review

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        # Seed code goes here!
        users = []
        beers = []
        reviews = []

        User.query.delete()
        username = fake.first_name()

        Beer.query.delete()

        Review.query.delete()

        user = User(
            username=username,
            password="mypw"
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
        beer4 = Beer(
            name="Oktoberfest",
            beer_type="Marzen",
            brewery="Sam Adams"
        )

        beers.append(beer1)
        beers.append(beer2)
        beers.append(beer3)
        beers.append(beer4)


        db.session.add_all(users)
        db.session.add_all(beers)


        db.session.commit()
        print("Seeded!")

        first_user_data = User.query.first().to_dict()
        first_beer_data = Beer.query.first().to_dict()
        print(first_user_data['id'])
        print(first_beer_data['id'])

        review1 = Review(
            body="Tasty beer!",
            rating = 5,
            user_id = users[0].id,
            beer_id = beers[0].id
        )

        reviews.append(review1)

        db.session.add_all(reviews)
        db.session.commit()

