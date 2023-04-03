from app.models import db, Page, environment, SCHEMA
from sqlalchemy.sql import text
import json

def seed_pages():
    pages = [    
        {
            'workspace_id': 1,
            'name': 'Getting Started',
            'content': {
                "ops": [
                    {"insert": "Welcome to AIdea!\n", "attributes": {"header": 1}},
                    {"insert": "\n"},
                    {"insert": "Here are the basics:\n"},
                    {"insert": "Click anywhere and just start typing\n"},
                    {"insert": "Hit / to see all the types of content you can add such as headers, code-blocks, to-do-lists, kanban-boards, tables\n"},
                    {"insert": "See the ⋮⋮ to the left of this text on hover? Click and drag to move this line\n"},
                    {"insert": "Click the + New Page button at the bottom of your sidebar to add a new page\n"},
                    {"insert": "Click templates in your sidebar to get started with pre-built pages\n"},
                    {"insert": "Press space to give the AIdea AI a spin"}
                ]
            }
        },
        {
            'workspace_id': 1,
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
            'workspace_id': 1,
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
            'workspace_id': 1,
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
            'workspace_id': 1,
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
            'workspace_id': 1,
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
            'workspace_id': 1,
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

    for page in pages:
        db.session.add(Page(
            workspace_id = page['workspace_id'],
            name = page['name'],
            content = page['content']
        ))
    
    db.session.commit()


def undo_pages():
    if environment == "production": 
        db.session.execute(f"TRUNCATE table {SCHEMA}.pages RESTART IDENTITY CASCADE;")
    else: 
        db.session.execute(text("DELETE FROM pages"))
    
    db.session.commit()