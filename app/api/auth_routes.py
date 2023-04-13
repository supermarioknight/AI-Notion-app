from flask import Blueprint, jsonify, session, request
from app.models import User, db, Workspace, Page
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        username = form.data['username']
        email = form.data['email']
        password = form.data['password']

        user = User(
            username=username,
            email=email,
            password=password
        )
        db.session.add(user)
        db.session.commit()

        workspace = Workspace(user_id=user.id, name="My Workspace")
        db.session.add(workspace)
        db.session.commit()


        default_pages = [
            {
                'name': 'Getting Started',
                'content': {
                    "ops": [
                        {"insert": "Welcome to AIdea!\n", "attributes": {"header": 1}},
                        {"insert": "\n"},
                        {"insert": "Here are the basics:\n"},
                        {"insert": "Click anywhere and just start typing\n"},
                        {"insert": "See the ⋮⋮ to the left of this text on hover? Click and drag to move this line\n"},
                        {"insert": "Click the + New Page button at the bottom of your sidebar to add a new page\n"},
                        {"insert": "Click templates in your sidebar to get started with pre-built pages\n"},
                        {"insert": "Press '/' to see a list of all AIdea commands to have the AI work for you.\n"},
                    ]
                }
            },
            {
                'name': 'Example Reading List',
                'content': {
                    "ops": [
                    {"insert": "Example Reading List\n", "attributes": {"header": 1}},
                    {"insert": "\n"},
                    {"insert": "1. Book Title: Slug Master 101 'The Visionary', Type: Self Help, Read? Yes\n"},
                    {"insert": "2. Book Title: Jason Greenberg da Mad Genius, Type: Philosophy, Read? No\n"},
                    {"insert": "3. Book Title: Will Htay 'The Leader', Type: Sports Management, Read? No\n"},
                    {"insert": "4. Book Title: Marcus Kim 'The Mastermind', Type: Business Organization, Read? Yes\n"}
                    ]
                }
            },
            {
                'name': 'Code Block Template',
                'content': {
                    "ops": [
                        {"insert": "Code Block Template\n", "attributes": {"header": 1}},
                        {"insert": "\n"},
                        {"insert": "console.log('Hello World')\n", "attributes": {"code": True}},
                        {"insert": "def passcapstone(feature1, feature2):\n", "attributes": {"code": True}},
                    ]
                }
            },
            {
                'name': 'AIdea Board',
                'content': {
                    "ops": [
                        {"insert": "For When You're Out of Ideas AIdea can take care of the creative process for you. \n", "attributes": {"header": 1}},
                        {"insert": "\n"},
                        {"insert": "List of all AIdea Commands:\n"},
                        {"insert": "Must Type '/' to start Commands:\n"},
                        {"insert": "/Improve Me: Will revise and improve anything you create but much better. \n"},
                        {"insert": "/Story Time: Help you publish a book or a story on any topic and you don't even have to do the thinking.\n"},
                        {"insert": "/Writers Block: Will give you a random AIdea to help with your blocked process\n"},
                        {"insert": "/Outline: Will create an outline for any subject or topic of your choice that you're writing about. \n"},
                        {"insert": "/Brain Dead: When you don't want to think anymore and just let AI do everything for you. \n"},
                        {"insert": "Harness the power of AIdea and you never have to think again."},
                    ]
                }
            },
            {
                'name': 'AIdea Revision',
                'content': {
                    "ops": [
                        {"insert": "AIdea can revise and clean up everything from your notes, to your resumes, and a lot more. \n", "attributes": {"header": 1}},
                        {"insert": "\n"},
                        {"insert": "Aidea will dramatically make whatever you're working on sound a lot better.\n"},
                        {"insert": "So that you can spend your time just jotting out chaotic ideas.\n"},
                        {"insert": "Just let AIdea handle the heavy lifting of making you actually sound impressive.\n"},
                        {"insert": "Press the '/' Key\n"},
                        {"insert": "Enter 'Improve Me'\n"},
                        {"insert": "And watch as it creates a story for you on this page"}
                    ]
                }
            },
            {
                'name': 'AIdea Story Time',
                'content': {
                    "ops": [
                        {"insert": "Lets have AIdea tell us a Story here\n", "attributes": {"header": 1}},
                        {"insert": "\n"},
                        {"insert": "Press the '/' Key\n"},
                        {"insert": "Enter 'Story Time'\n"},
                        {"insert": "Then give it a topic for the story\n"},
                        {"insert": "And watch as it creates a story for you on this page"}
                    ]
                }
            },
            {
                'name': 'Ordered Lists',
                'content': {
                    "ops": [
                        {"insert": "Subjects I'm Studying\n", "attributes": {"header": 2}},
                        {"insert": "1. Biology\n"},
                        {"insert": "2. Calculus\n"},
                        {"insert": "3. Computer Science\n"},
                        {"insert": "4. Python\n"},
                        {"insert": "\n"},
                        {"insert": "Groceries\n", "attributes": {"header": 2}},
                        {"insert": "1. Ramen\n"},
                        {"insert": "2. Potatoes\n"},
                        {"insert": "3. Oranges\n"},
                        {"insert": "4. Onions\n"},
                        {"insert": "\n"},
                        {"insert": "Bills\n", "attributes": {"header": 2}},
                        {"insert": "1. Utilities\n"},
                        {"insert": "2. Internet\n"},
                        {"insert": "3. Rent\n"},
                        {"insert": "4. Girlfriend Expenses\n"},
                        {"insert": "\n"},
                    ]
                }
            },
        ]

        for page_data in default_pages:
            page = Page(workspace_id=workspace.id, name=page_data['name'], content=page_data['content'])
            db.session.add(page)


        db.session.commit()
        

        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401