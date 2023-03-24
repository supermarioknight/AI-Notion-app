from app.models import db, Block, environment, SCHEMA
from sqlalchemy.sql import text


def seed_blocks():
    blocks = [
    {
        'block_id': 1, 
        'page_id': 1, 
        'template_id': 1, 
        'content': {
        "header": ["Welcome to Idea Fusion!"],
        "text": [
        "Here are the basics:",
        "Click anywhere and just start typing",
        "Hit / to see all the types of content you can add such as headers, code-blocks, to-do-lists, kanban-boards, tables",
        "See the ⋮⋮ to the left of this text on hover? Click and drag to move this line",
        "Click the + New Page button at the bottom of your sidebar to add a new page",
        "Click templates in your sidebar to get started with pre-built pages",
        "Press space to give the Idea Fusion AI a spin"
            ],
        },
    },
    {
        'block_id': 2,
        'page_id': 2,
        'template_id': 2,
        'content': {
            'ordered_list': [
                {
                    'header': ["Subjects I'm Studying"],
                    'list': [
                        "Biology",
                        "Calculus",
                        "Computer Science",
                        "Python"
                    ]
                },
                {
                    'header': ["Groceries"],
                    'list': [
                        "Ramen",
                        "Potatoes",
                        "Oranges",
                        "Onions"
                    ]
                },
                {
                    'header': ["Bills"],
                    'list': [
                        "Utilities",
                        "Internet",
                        "Rent",
                        "Girlfriend Expenses"
                    ]
                }
            ]
        }
    },
    {
        'block_id': 3,
        'page_id': 3,
        'template_id': 3,
        'content': {
            "header": ["Reading List"],
            "database": {
                "Name": [
                    "This Project is Hard",
                    "Shout out to Jason GreenBerg",
                    "Shout out to Will Htay",
                    "Shout out to Marcus Kim",                    
                ],
                "Type": [
                    "Self Help",
                    "Philosophy",
                    "Sports Management",
                    "Business Organization",
                ],
            }
        }
    },
    {
        'block_id': 4,
        'page_id': 4,
        'template_id': 4,
        'content': {
            "header": ["To-Do Board"],
            "to-do": {
                "To Do": [
                    "Pass this project",
                    "Learn how to use Mongo DB",
                ],
                "Doing": [
                    "Getting a job at Google",
                    "Finding a software engineering job",
                    "Game plan for stalking tech recruiters",
                    "Presenting this Project"
                ],
                "Done": [
                    "Not this project"
                ]
            }
        }
    },
    {
        'block_id': 5,
        'page_id': 5,
        'template_id': 5,
        'content': {
            "header": ["Code Block Template"],
            "code": [
                "console.log('Hello World')",
                "def passcapstone(feature1, feature2):"
            ]
        }
    },
    {
        'block_id': 6,
        'page_id': 6,
        'template_id': 6,
        'content': {
            "header": ["Excel Like Tables Template"],
            "table": {
                "Companies": [
                    "Google",
                    "Notion",
                    "Apple",
                    "Netflix"
                ],
                "Applied?": [
                    "Yes",
                    "No",
                    "Yes",
                    "No"
                ],
                "Expected Salary": [
                    "$125,000",
                    "$140,000",
                    "Apple can't afford to pay me",
                    "$1,000,000"
                ],
            }
        }
    },
    {
        'block_id': 7,
        'page_id': 7,
        'template_id': 7,
        'content': {
            "header": ["Untitled"],
            "content": {
                "text": [
                    "Empty Page Where you can let your ideas run wild",
                    "Feel free to use forward slash '/' to see all the available options to use"
                ]
            }
        }
    },
    {
        'block_id': 8,
        'page_id': 1,
        'template_id': 1,
        'content': {
            "text": ["You can write Code using code blocks like this"],
            "code": ["print Hello"]
        }
    },
    {
        'block_id': 9,
        'page_id': 9, 
        'template_id': 9,
        'content': {
            "header": ["Template Kan-Ban Board"],
            "to-do": {
                "To Do": [
                    "",
                    "",
                    "",
                ],
                "Doing": [
                    "",
                    "",
                    "",
                ],
                "Done": [
                    "",
                    "",
                    ""
                ]
            }
        }
    },
    {
        'block_id': 10,
        'page_id': 10,
        'template_id': 10,
        'content': {
            "header": ["Tables Template"],
            "table": {
                "Column 1": [
                    "1",
                    "2",
                    "3",
                    "4"
                ],
                "Column 2": [
                    "A",
                    "B",
                    "C",
                    "D"
                ],
                "Column 3": [
                    "10",
                    "20",
                    "30",
                    "40"
                ],
            }
        }
    },
    {
        'block_id': 11,
        'page_id': 11,
        'template_id': 11,
        'content': {
            "header": ["Code Block Template"],
            "code": [
                "console.log('Hello World')",
                "def passcapstone(feature1, feature2):"
            ]
        }
    },
    {
        'block_id': 12,
        'page_id': 12,
        'template_id': 12,
        'content': {
            'ordered_list': [
                {
                    'header': ["Subjects I'm Studying"],
                    'list': [
                        "Biology",
                        "Calculus",
                        "Computer Science",
                        "Python"
                    ]
                },
                {
                    'header': ["Groceries"],
                    'list': [
                        "Ramen",
                        "Potatoes",
                        "Oranges",
                        "Onions"
                    ]
                },
                {
                    'header': ["Bills"],
                    'list': [
                        "Utilities",
                        "Internet",
                        "Rent",
                        "Girlfriend Expenses"
                    ]
                }
            ]
        }
    },
]

    for block in blocks:
        db.session.add(Block(
            block_id = block['block_id'],
            page_id = block['page_id'],
            template_id = block['template_id'],
            content = block['content'],
        ))

    db.session.commit()

def undo_blocks():
    if environment == "production": 
        db.session.execute(f"TRUNCATE table {SCHEMA}.Blocks RESTART IDENTITY CASCADE;")
    else: 
        db.session.execute(text("DELETE FROM Blocks"))
    
    db.session.commit()