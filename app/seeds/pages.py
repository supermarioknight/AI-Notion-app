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
                    {"insert": "See the buttons up top? You can use AIdea to make your workflow easier.\n"},
                    {"insert": "Click the + New Page button at the bottom of your sidebar to add a new page\n"},
                    {"insert": "Click templates in your sidebar to get started with pre-built pages\n"},
                    {"insert": "Press '/' to see a list of all AIdea commands to have the AI work for you.\n"},
                    {"insert": "Summarize will summarize the content on your page in a digestable format.\n"},
                    {"insert": "Story Time will have AIdea create a story for you based on the topic you choose in the prompt\n"},
                    {"insert": "Improve Me will improve your current page content and make it sound much better.\n"},
                    {"insert": "I'm a idiot will help you create content that even a child can understand based on your page content.\n"},
                    {"insert": "Code for me will create code for you based on the parameters of the page.\n"},
                    {"insert": "Outline will create an outline of the content you have so far.\n"},
                    {"insert": "Harness the power of AIdea and you never have to think again."},
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
                    {"insert": "I would like to code Hello World\n", "attributes": {"code": True}},
                    {"insert": "Can you help me create a function that sums up everything in an array?\n", "attributes": {"code": True}},
                    {"insert": "Can you show me code that explains how to use the filter javascript array method?\n", "attributes": {"code": True}},
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
                    
                ]
            }
        },
        {
            'workspace_id': 1,
            'name': 'Journal Prompt',
            'content': {
                "ops": [
                    {"insert": "AIdea can Generate Journal Prompts for you. \n", "attributes": {"header": 1}},
                    {"insert": "\n"},
                    {"insert": "If you click the journal prompt button it will generate a random journal prompt for you.\n"},
                    {"insert": "This should help you create journals with ease without having to think about what to write about."},
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