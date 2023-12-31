from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.orm import validates
from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    serialize_rules = ('-reviews.user',)

    @hybrid_property
    def password(self):
        return self._password_hash
        #this works, but I'm confused why the getter is called when the setter is. If I raise the exception as below, the exception is thrown when setting a new password. Why??

        #raise Exception("Retrieving Password Hashes is Forbidden.")

    @password.setter
    def password(self, user_password):
        hash = bcrypt.generate_password_hash(user_password.encode('utf-8'))
        self._password_hash = hash.decode('utf-8')

    def authenticate_user(self, entered_password):
        return bcrypt.check_password_hash(self._password_hash, entered_password.encode('utf-8'))


    reviews = db.relationship('Review', back_populates='user', cascade='all, delete-orphan')



class Beer(db.Model, SerializerMixin):
    __tablename__ = 'beers'

    serialize_rules = ('-reviews.beer',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    beer_type = db.Column(db.String, nullable=False)
    brewery = db.Column(db.String, nullable=False)

    reviews = db.relationship('Review', back_populates='beer')

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    serialize_rules = ('-user.reviews', '-beer.reviews',)

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String, nullable=False)
    rating = db.Column(db.Integer, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    beer_id = db.Column(db.Integer, db.ForeignKey('beers.id'))

    @validates('rating')
    def validate_rating(self, key, rating):
        if int(rating) < 1 or int(rating) > 5:
            raise ValueError("rating must be between 1 and 5")
        return rating

    user = db.relationship('User', back_populates='reviews')
    beer = db.relationship('Beer', back_populates='reviews')

