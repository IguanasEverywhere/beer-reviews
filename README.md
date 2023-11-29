# Brews Reviews

## How to Use

On the Brews Reviews website, a user can register for an account via unique username and password that they create. Once registered, a user can login and then:

- View beers in the database
- Add a review (both a rating and prose) for a beer in the database
- View other users' reviews of beers in the database
- Edit or Delete one of their own reviews
- Add a new beer + review for a beer that's not yet in the database
- Logout

Anonymous users (i.e. users who are not logged in) may still view all of the beers and reviews in the database, but they must create an account and log in to create their own reviews!

---

## Structure and Stack

Brews Reviews is a full-stack application, with a React front end and a Flask back end. Front end files are located in the `client` directory, and utilize the following tools:
- JavaScript/React
- React-Router for client-side routing
- Formik and Yup for forms and form validation
- CSS modules for styling

Back end files are located in the `server` directory and utilize the following tools:
- Flask and Flask-SQLAlchemy
- flask_restful for RESTful server-side routes
- flask-bcrypt for password hashing and user authentication
- python-dotenv for .env (secret key and URI) management
- flask_cors for managing Cross Origin Resource Sharing
- flask_migrate for Alembic migrations
- faker for generating some aspects of seed data
- SQLite for local development; the live application is deployed using PostgreSQL and Render for hosting


## Client

The following is a brief overview of the components in the `client/src/components` directory and the purposes they serve:

#### App.js

Serves as the entry point for the entire React application. Returns the `NavBar` component on top of the other component `Route`s nested witin a `Switch` from react-router-dom. This allows the navigation bar to be visible while allowing the for the rest of the page body to display the appropriate component to the user based on their interaction.

#### AllBeers

Upon loading, a useEffect is used to run a fetch request for the beer data. This data is then mapped onto list items (that are also links to routes for their respective beer ids), and rendered under a heading.

#### BeerReviews

Via a useEffect, this component fetches data from the server about a particular beer, including the logged in user info (if there is a logged in user). Once the data is retrieved, it is saved in state, and filtered between the user's own review data and other users' review data.

If there is a logged in user:

It is checked whether that user has a review for that beer. If so, that review is mapped into a `ReviewCard` to be displayed; if not, a form is rendered (with validation handled via Formik and yup) inviting to the user to compose and submit a review for that beer.

If the user is no logged in user:

A request for the user to login is rendered under the "Your Review" heading.

In either case:

All reviews not belonging to a logged in user are mapped to a separate list of `ReviewCard`s, which are then rendered under the "Other Users' Reviews" heading.

#### Homepage

A fetch to the server is completed, and it is determined whether they are logged in or not via the response code. If they are logged in, they are greeted with a welcome image and personalized greeting. If not, they are invited to either sign up or log in. Clicking "log in" redirects the user to the login route; the sign up form is validated by Formik and Yup. The password field is validated using Regex to require both letters and numbers; a custom error message is rendered if this requirement is not met. If someone attempts to sign up with a username that already exists in the database (thus returning a 409 code), the `userExistsError` state is set to true, and this is used to inform the user that they must choose a different username.

#### Login

The Login route sends a request to the back end to check if the user is already logged in. If they are, they are redirected to the home route. If they are not, a formik/Yup validated form is rendered, which POSTs to the back end on submission. If this POST requests returns any code other than 200 (i.e. success), the the `badLogin` state is set to true, rendering an error message and asking the user to try again. Otherwise, the `loggedIn` state is set to true, triggering the redirect to the home route.

#### Logout

Perhaps the simplest front end route/component in the application, the logout route simply sends a DELETE request to the server to delete the current user session. A confirmation message is displayed to the user.

#### MyAccount

A request is sent to the server to determine whether the user is logged in. If they are, the `isLoggedIn` state is set to true. The current user (if there is one) is applied to `setCurrentUser`. While the `isLoggedIn` state is true, a menu of options (with appropriate Links) for the user is displayed, otherwise, a prompt to log in is displayed.

#### MyBeers

This route sends a request to the `my-beers` route from the API. If the request is successful (i.e. a user is logged in), the `requestInfo` state is updated to include this information and the user's beers. The beers are then mapped into li/Link objects and displayed to the user. If the user is not logged in, the `loggedIn` portion of the state object remains false, and the user is prompted to log in. If the user is logged in but has no beer reviews yet, a message is rendered inviting them to complete their first brew review.


#### NavBar

Self-explanatory; this component is always rendered at the top of the page, with NavLinks to direct the user to various parts of the application.

#### NewBeer

The `/new` route on the API is first hit to check if the user is logged in. If they are not logged in, a message prompting them to do is rendered. Otherwise, a form is rendered, prompting for information about the new beer and the user's review of it. Formik and yup are used to ensure that the fields are completed with appropriate type and (in some cases) length of information, with appropriate error messages in case of failure. Upon submission of the form info (via a POST to the same `/new` route), the returned status determines whether there was the error of the beer already existing in the database, in which case the `setBeerExistsError` state is updated and the appropriate message is displayed to the user. If the submission is successful, `setSuccessfulSubmission` is updated, which triggers a render of the confirmation message.

#### ReviewCard

ReviewCard receives its parameters (destructured) from the BeerReviews component. Each card displays the information about the beer and review. If `canEdit` is received as `true` (meaning the review belongs to the logged in user), then edit and delete buttons are also rendered to the card. If the edit button is clicked, the `isEditing` state is set to `true`, which allows for the edit form to be rendered. This form, again validated using Formik and yup, is pre-populated with the information that already exists for the review. Submission of this edit form sends a PATCH request to the API, and then `history.go(0)` from react-router-dom is used to re-render the page, reflecting the changes. The delete button, as expected, sends a DELETE request intead of a PATCH request to the API, and then again re-renders the page.

## Server

The following is a brief survey of some of the important back end files for Brews Reviews, which reside in the `/server` directory of the project.

#### config.py

Config is where much of the "setup" for the Flask application resides. flask itself, along with numerous flask-related libraries, are imported and instantiated here.
* Dotenv and os are used import to the `SECRET_KEY` and `DATABASE_URI` from the .env file, allowing this sensitive data to remain separate and not risk exposure through being uploaded to GitHub.
* `app` is instantiated as flask application
* a `bcrypt` instance is created with `app` passed into it
* the app's `secret_key` is set via the aforementioned dotenv process
* configuration options are set. Most notably, the `SQLALCHEMY_DATABASE_URI` is set. You'll see two options, with one commented out: This is so a sqlite db can be used for local development and testing, with the deployed database URI becoming commented in for the live application.
* metadata is defined, with a naming convention set (see https://medium.com/@scottschwab86/no-anonymous-constraints-a-bit-about-the-sqlalchemy-naming-convention-ef2681e3fda0 for some thoughts on naming_convention!)
* This metadata is passed into `db`, a instantiated SQLAlchemy object
* `Migrate` and and `init_app` tie together the SQLAlchemy database and the Flask application.
* `flask_restful` is used to instantiate an API object
* CORS (Cross-Origin-Resource-Sharing) is set up to allow the server to accept requests from the front end


#### app.py

The app file is where the routes for the Flask application are set up.

* Routes are passed into `render_template`, enabling routes to be accessed directly (i.e. without user navigation). Without this, the deployed application would crash if a user were to "refresh" a page that accesses some of these routes.
* `before_request` calls upon a function that checks whether a user is logged in. If the an endpoint is accessed and there is no active user session, the API will return an error object before attempting to complete any of the actions intended to be available only to authenticated users.
* Home responds to a GET request an object containing active user session
* Signup expects a POST request; it parses the username and password from the request, creates a new user object, and commits the new user object to the database. A check is in place to ensure that such a username doesn't already exist in the database first, if it does, an error is returned without committing the new object to the db.
* Login sends the active user session back to the client on a GET request (this is used on the front end to determine whether the user needs to login or be redirected). The username and password data is parsed, the user object is retrieved from the db, and then the password is passed to thta model's `authenticate_user` method. If authentication is successful, the session is set with the user's credentials, and the user's information is returned as a response. If authentication fails, an error object is returned.
* The Logout route accepts a DELETE request, which simply removes the current user info (if any) from the current session.
* The GET method for AllBeers queries the database for all the beers, serializes them to Python dictionaries, and returns them as a response.
* The MyBeers route first identifies the current user id from the session, then queries the Reviews table and filters the results based on those which match the current user's id. These reviews are then serialized and returned as a response.
* NewBeer responds to a GET request with the logged in user's ID. The POST method parses out the form data and saves them to Python variables. The Beer table is queried with the brewery and beer name information; if this results in an object, then that means the beer already exists in the database, and therefore an error object with a message stating this issue is returned. Otherwise, the form data is used to create a new Beer object, which is then added to the session and committed to the database
* The AlterReview class contains POST, DELETE, and PATCH methods. The POST method, as expected, creates a new Review object from the request data, and also adds to the new object the current user id from the session before committing the new review to the db. The DELETE method retrieves the current user id as well as the intended review id. This data is used to retrieve the review from the db, which is then deleted. Similar to the POST method, the PATCH method parses the data from the request, but then retrieves the appropriate review from the db. The retrieved review object is then altered and committed to the db.
* SingleBeerReviews is referenced by the endpoint `/api/beers/<int:id>`. The GET method retrieves the current user id as well as queries the specified beer (by the id) from the db. This info is combined into a response object which is then returned.
* MyAccount responds to a GET request with a response object containing the current user's information.
* Each route, which inherits from flask_restful's `Resource` and is built with that specification in mind, is then passed `add_resource` method of the api object (the flask_restful object from config) with established endpoints. Each endpoint is prefixed with "/api/" in order to alleviate any routing conflicts that may accidentally arise with the front end.

#### models.py

There are three main models for Brews Reviews: User, Beer, and Review. The relationships between these models (and database tables) is roughly as follows:

* A user can have many reviews; a review can only belong to one user
* A beer can have many reviews, a review can only belong to one beer
* A user can have many beers (via reviews)
* A beer can have many users (via reviews)

Examining each model in some more detail:


##### User
The User model has three columns: id, username, and _password_hash. Constraints are in place for types (integer, string), as well as primary_key constraint for id, and nullable and unique constraints for the username. The _password_hash is s created by bcrypt's `generate_password_hash` and is authenticated by its `check_password_hash` method. `password` is set as a hybrid property so that it can retain both SQLAlchemy and Python functionality. This property's getter returns the _password_hash column; its setter is used to call upon the aforementioned creation and authentication methods from bcrypt. A relationship is established with the Review table, and a cascade option for delete-orphan is set (if a user is deleted, so should its reviews).

##### Beer
The Beer table establishes columns for id, name, beer_type, and brewery. All columns are strings except for the id, which is an integer and also the primary_key. Like User, a relationship is established with the Review model.

##### Review
The Review table, which facilitates the many-to-many relationships as described above, containts two foreign key columns, pertaining to the User's id column and the Beer's id column. The relationship is explictly establishe between the two other models as well via db.relationship. In addition to the foreign key columns, the Review table also contains its own id (primary key), as well as a string column for the review body and an integer column for the review rating.


#### seed.py
A seed file is included for development and testing purposes. Faker is used to generate random usernames, then passwords and beer reviews are manually created. After deleting any pre-existing data from the database, these newly created objects are added to collections which are then committed to the db.

## Ideas For Future Development

Like any application, Brews Reviews still has potential for growth, change, and further development in the future. Some ideas include, but are not limited to:
* Ability to view another user's reviews by clicking on their names
* Ability to comment on another user's reviews
* Improve styling of certian components. Particularly, adding "loading" modals that display while waiting for some data to be retrieved from the back end
* Incorporating a list of well-known breweries when adding a new beer, rather than relying on the user to always manually type a brewery name. Same for beer types.
* Adding more in-depth validation to edit forms
* Allow a user to "favorite" certain beers
* Many more!

Please submit any ideas for further development to Scott Schwab, scottschwab86@gmail.com

Developed by Scott Schwab, 2023