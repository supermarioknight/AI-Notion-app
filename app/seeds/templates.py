from app.models import db, Template, environment, SCHEMA
from sqlalchemy.sql import text
import json

def seed_templates():
    templates = [
        {
            'name': 'Getting Started',
            'content': {
                "ops": [
                    {"insert": "Welcome to Idea Fusion!\n", "attributes": {"header": 1}},
                    {"insert": "\n"},
                    {"insert": "Here are the basics:\n"},
                    {"insert": "Click anywhere and just start typing\n"},
                    {"insert": "Hit / to see all the types of content you can add such as headers, code-blocks, to-do-lists, kanban-boards, tables\n"},
                    {"insert": "See the ⋮⋮ to the left of this text on hover? Click and drag to move this line\n"},
                    {"insert": "Click the + New Page button at the bottom of your sidebar to add a new page\n"},
                    {"insert": "Click templates in your sidebar to get started with pre-built pages\n"},
                    {"insert": "Press space to give the Idea Fusion AI a spin"}
                ]
            }
        },
        {
            'name': 'Example Reading List',
            'content': {
                "ops": [
                    {"insert": "Example Reading List\n", "attributes": {"header": 1}},
                    {"insert": "\n"},
                    {"insert": {"table": {"rows": 5, "cols": 3}}},
                    {"insert": "\n"},
                    {"insert": "Book Title", "attributes": {"table_cell": {"row": 0, "col": 0}}},
                    {"insert": "Type", "attributes": {"table_cell": {"row": 0, "col": 1}}},
                    {"insert": "Read?", "attributes": {"table_cell": {"row": 0, "col": 2}}},
                    {"insert": "Slug Master 101 'The Visionary'", "attributes": {"table_cell": {"row": 1, "col": 0}}},
                    {"insert": "Self Help", "attributes": {"table_cell": {"row": 1, "col": 1}}},
                    {"insert": "Yes", "attributes": {"table_cell": {"row": 1, "col": 2}}},
                    {"insert": "Jason Greenberg da Mad Genius", "attributes": {"table_cell": {"row": 2, "col": 0}}},
                    {"insert": "Philosophy", "attributes": {"table_cell": {"row": 2, "col": 1}}},
                    {"insert": "No", "attributes": {"table_cell": {"row": 2, "col": 2}}},
                    {"insert": "Will Htay 'The Leader'", "attributes": {"table_cell": {"row": 3, "col": 0}}},
                    {"insert": "Sports Management", "attributes": {"table_cell": {"row": 3, "col": 1}}},
                    {"insert": "No", "attributes": {"table_cell": {"row": 3, "col": 2}}},
                    {"insert": "Marcus Kim 'The Mastermind'", "attributes": {"table_cell": {"row": 4, "col": 0}}},
                    {"insert": "Business Organization", "attributes": {"table_cell": {"row": 4, "col": 1}}},
                    {"insert": "Yes", "attributes": {"table_cell": {"row": 4, "col": 2}}},
                ]
            }
        },
        {
            'name': 'To-Do Board',
            'content': {
                "ops": [
                    {"insert": "To-Do Board\n", "attributes": {"header": 1}},
                    {"insert": "\n"},
                    {"insert": {"table": "3x4"}},  # 3 columns and 4 rows
                    {"insert": "To Do"},
                    {"insert": {"table": "1x1"}},
                    {"insert": "Doing"},
                    {"insert": {"table": "1x1"}},
                    {"insert": "Done"},
                    {"insert": {"table": "1x1"}},
                    {"insert": "Pass this project"},
                    {"insert": {"table": "1x1"}},
                    {"insert": "Getting a job at Google"},
                    {"insert": {"table": "1x1"}},
                    {"insert": "Not this project"},
                    {"insert": {"table": "1x1"}},
                    {"insert": "Learn how to use Mongo DB"},
                    {"insert": {"table": "1x1"}},
                    {"insert": "Finding a software engineering job"},
                    {"insert": {"table": "1x1"}},
                    {"insert": ""},
                    {"insert": {"table": "1x1"}},
                    {"insert": "Game plan for stalking tech recruiters"},
                    {"insert": {"table": "1x1"}},
                    {"insert": ""},
                    {"insert": {"table": "1x1"}},
                    {"insert": ""},
                    {"insert": {"table": "1x1"}},
                    {"insert": "Presenting this Project"},
                    {"insert": {"table": "1x1"}},
                    {"insert": ""},
                    {"insert": {"table": "1x1"}},
                    {"insert": ""},
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
            'name': 'Excel Like Tables Template',
            'content': {
                "ops": [
                    {"insert": "Excel Like Tables Template\n", "attributes": {"header": 1}},
                    {"insert": "\n"},
                    {"insert": {"table": {"rows": 5, "cols": 3}}, "attributes": {"width": "100%"}},
                    {"insert": "Companies", "attributes": {"table": {"row": 0, "cell": 0}}},
                    {"insert": "Applied?", "attributes": {"table": {"row": 0, "cell": 1}}},
                    {"insert": "Expected Salary", "attributes": {"table": {"row": 0, "cell": 2}}},
                    {"insert": "Google", "attributes": {"table": {"row": 1, "cell": 0}}},
                    {"insert": "Yes", "attributes": {"table": {"row": 1, "cell": 1}}},
                    {"insert": "$125,000", "attributes": {"table": {"row": 1, "cell": 2}}},
                    {"insert": "Notion", "attributes": {"table": {"row": 2, "cell": 0}}},
                    {"insert": "No", "attributes": {"table": {"row": 2, "cell": 1}}},
                    {"insert": "$140,000", "attributes": {"table": {"row": 2, "cell": 2}}},
                    {"insert": "Apple", "attributes": {"table": {"row": 3, "cell": 0}}},
                    {"insert": "Yes", "attributes": {"table": {"row": 3, "cell": 1}}},
                    {"insert": "Apple can't afford to pay me", "attributes": {"table": {"row": 3, "cell": 2}}},
                    {"insert": "Netflix", "attributes": {"table": {"row": 4, "cell": 0}}},
                    {"insert": "No", "attributes": {"table": {"row": 4, "cell": 1}}},
                    {"insert": "$1,000,000", "attributes": {"table": {"row": 4, "cell": 2}}},
                    {"insert": "\n"},
                ]
            }
        },
        {
            'name': 'Tables Template',
            'content': {
                "ops": [
                    {"insert": "Tables Template\n", "attributes": {"header": 1}},
                    {"insert": "\n"},
                    {"insert": {"table": {"rows": 5, "cols": 3}}, "attributes": {"width": "100%"}},
                    {"insert": "Column 1", "attributes": {"table": {"row": 0, "cell": 0}}},
                    {"insert": "Column 2", "attributes": {"table": {"row": 0, "cell": 1}}},
                    {"insert": "Column 3", "attributes": {"table": {"row": 0, "cell": 2}}},
                    {"insert": "1", "attributes": {"table": {"row": 1, "cell": 0}}},
                    {"insert": "A", "attributes": {"table": {"row": 1, "cell": 1}}},
                    {"insert": "10", "attributes": {"table": {"row": 1, "cell": 2}}},
                    {"insert": "2", "attributes": {"table": {"row": 2, "cell": 0}}},
                    {"insert": "B", "attributes": {"table": {"row": 2, "cell": 1}}},
                    {"insert": "20", "attributes": {"table": {"row": 2, "cell": 2}}},
                    {"insert": "3", "attributes": {"table": {"row": 3, "cell": 0}}},
                    {"insert": "C", "attributes": {"table": {"row": 3, "cell": 1}}},
                    {"insert": "30", "attributes": {"table": {"row": 3, "cell": 2}}},
                    {"insert": "4", "attributes": {"table": {"row": 4, "cell": 0}}},
                    {"insert": "D", "attributes": {"table": {"row": 4, "cell": 1}}},
                    {"insert": "40", "attributes": {"table": {"row": 4, "cell": 2}}},
                    {"insert": "\n"},
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

    for template in templates:
        db.session.add(Template(
            name = template['name'],
            content = template['content']
        ))

    db.session.commit()

def undo_templates():
    if environment == "production": 
        db.session.execute(f"TRUNCATE table {SCHEMA}.templates RESTART IDENTITY CASCADE;")
    else: 
        db.session.execute(text("DELETE FROM templates"))
    
    db.session.commit()