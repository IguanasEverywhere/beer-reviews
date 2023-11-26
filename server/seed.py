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

        Review.query.delete()
        Beer.query.delete()
        User.query.delete()

        user1 = User(
            username=fake.first_name(),
            password="mypw123"
        )

        user2 = User(
            username = fake.first_name(),
            password="anotherpw456"
        )

        users.append(user1)
        users.append(user2)

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


        first_user_data = User.query.first().to_dict()
        first_beer_data = Beer.query.first().to_dict()

        review1 = Review(
            body="Tasty beer!",
            rating = 5,
            user_id = users[0].id,
            beer_id = beers[0].id
        )

        review2 = Review(
            body="So-so, I've had better...!",
            rating = 3,
            user_id = users[0].id,
            beer_id = beers[1].id
        )

        review3 = Review(
            body="Great year-round choice!",
            rating = 4,
            user_id = users[1].id,
            beer_id = beers[0].id
        )

        review4 = Review(
            body="Very drinkable!",
            rating = 4,
            user_id = users[1].id,
            beer_id = beers[2].id
        )

        review5 = Review(
            body="Too sweet for me",
            rating = 2,
            user_id = users[1].id,
            beer_id = beers[3].id
        )



        reviews.append(review1)
        reviews.append(review2)
        reviews.append(review3)
        reviews.append(review4)
        reviews.append(review5)

        db.session.add_all(reviews)
        db.session.commit()

        print("Seeded!")

