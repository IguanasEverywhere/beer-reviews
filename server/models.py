from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

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
        # do we need to encode this again? other resources don't seem to think so

    reviews = db.relationship('Review', back_populates='user')



class Beer(db.Model, SerializerMixin):
    __tablename__ = 'beers'

    serialize_rules = ('-reviews.beer',)

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    beer_type = db.Column(db.String)
    brewery = db.Column(db.String)

    reviews = db.relationship('Review', back_populates='beer')

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    serialize_rules = ('-user.reviews', '-beer.reviews',)

    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String)
    rating = db.Column(db.Integer)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    beer_id = db.Column(db.Integer, db.ForeignKey('beers.id'))

    user = db.relationship('User', back_populates='reviews')
    beer = db.relationship('Beer', back_populates='reviews')

