from app.models import db, Block, environment, SCHEMA
from sqlalchemy.sql import text


def seed_blocks():
    blocks = [
    {
        'id': 1, 
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
        'id': 2,
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
        'id': 3,
        'page_id': 1,
        'template_id': 1,
        'content': {
            "header": ["Example Reading List"],
            "database": {
                "columns": [
                    "Book Title",
                    "Type",
                    "Read?"
                ],
                "rows": [
                    {
                        "Book Title": "Slug Master 101 'The Visionary'",
                        "Type": "Self Help",
                        "Read?": "Yes"
                    },
                    {
                        "Book Title": "Jason Greenberg da Mad Genius",
                        "Type": "Philosophy",
                        "Read?": "No"
                    },
                    {
                        "Book Title": "Will Htay 'The Leader'",
                        "Type": "Sports Management",
                        "Read?": "No"
                    },
                    {
                        "Book Title": "Marcus Kim 'The Mastermind'",
                        "Type": "Business Organization",
                        "Read?": "Yes"
                    }
                ]
            }
        }
    },
    {
        'id': 4,
        'page_id': 4,
        'template_id': 4,
            'content': {
                "header": ["To-Do Board"],
                "to_do": {
                "columns": ["To Do", "Doing", "Done"],
                "rows": [
                    {
                    "To Do": "Pass this project",
                    "Doing": "Getting a job at Google",
                    "Done": "Not this project"
                    },
                    {
                    "To Do": "Learn how to use Mongo DB",
                    "Doing": "Finding a software engineering job"
                    },
                    {
                    "Doing": "Game plan for stalking tech recruiters"
                    },
                    {
                    "Doing": "Presenting this Project"
                    }
                ]
            }
        }
    },
    {
        'id': 5,
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
        'id': 6,
        'page_id': 6,
        'template_id': 6,
        'content': {
            "header": ["Excel Like Tables Template"],
            "table": {
                "columns": [
                    "Companies",
                    "Applied?",
                    "Expected Salary"
                ],
                "rows": [
                    {
                        "Companies": "Google",
                        "Applied?": "Yes",
                        "Expected Salary": "$125,000"
                    },
                    {
                        "Companies": "Notion",
                        "Applied?": "No",
                        "Expected Salary": "$140,000"
                    },
                    {
                        "Companies": "Apple",
                        "Applied?": "Yes",
                        "Expected Salary": "Apple can't afford to pay me"
                    },
                    {
                        "Companies": "Netflix",
                        "Applied?": "No",
                        "Expected Salary": "$1,000,000"
                    }
                ]
            }
        }
    },
    {
        'id': 7,
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
        'id': 8,
        'page_id': 1,
        'template_id': 1,
        'content': {
            "header": ["You can write Code using code blocks like this"],
            "code": ["print Hello", "console.log('Hello World')"],
        }
    },
    {
        'id': 9,
        'page_id': 9,
        'template_id': 9,
            'content': {
                "header": ["To-Do Board"],
                "to_do": {
                "columns": ["To Do", "Doing", "Done"],
                "rows": [
                    {
                    "To Do": "Pass this project",
                    "Doing": "Getting a job at Google",
                    "Done": "Not this project"
                    },
                    {
                    "To Do": "Learn how to use Mongo DB",
                    "Doing": "Finding a software engineering job"
                    },
                    {
                    "Doing": "Game plan for stalking tech recruiters"
                    },
                    {
                    "Doing": "Presenting this Project"
                    }
                ]
            }
        }
    },
    {
        'id': 10,
        'page_id': 10,
        'template_id': 10,
        'content': {
            "header": ["Tables Template"],
            "table": {
                "columns": [
                    "Column 1",
                    "Column 2",
                    "Column 3"
                ],
                "rows": [
                    {
                        "Column 1": "1",
                        "Column 2": "A",
                        "Column 3": "10"
                    },
                    {
                        "Column 1": "2",
                        "Column 2": "B",
                        "Column 3": "20"
                    },
                    {
                        "Column 1": "3",
                        "Column 2": "C",
                        "Column 3": "30"
                    },
                    {
                        "Column 1": "4",
                        "Column 2": "D",
                        "Column 3": "40"
                    }
                ]
            }
        }
    },
    {
        'id': 11,
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
        'id': 12,
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
    {
        'id': 13,
        'page_id': 1,
        'template_id': 1,
            'content': {
                "header": ["To-Do Board"],
                "to_do": {
                "columns": ["To Do", "Doing", "Done"],
                "rows": [
                    {
                    "To Do": "Pass this project",
                    "Doing": "Getting a job at Google",
                    "Done": "Not this project"
                    },
                    {
                    "To Do": "Learn how to use Mongo DB",
                    "Doing": "Finding a software engineering job"
                    },
                    {
                    "Doing": "Game plan for stalking tech recruiters"
                    },
                    {
                    "Doing": "Presenting this Project"
                    }
                ]
            }
        }
    },
    {
        'id': 14,
        'page_id': 3,
        'template_id': 3,
        'content': {
            "header": ["Example Reading List"],
            "database": {
                "columns": [
                    "Book Title",
                    "Type",
                    "Read?"
                ],
                "rows": [
                    {
                        "Book Title": "Slug Master 101 'The Visionary'",
                        "Type": "Self Help",
                        "Read?": "Yes"
                    },
                    {
                        "Book Title": "Jason Greenberg da Mad Genius",
                        "Type": "Philosophy",
                        "Read?": "No"
                    },
                    {
                        "Book Title": "Will Htay 'The Leader'",
                        "Type": "Sports Management",
                        "Read?": "No"
                    },
                    {
                        "Book Title": "Marcus Kim 'The Mastermind'",
                        "Type": "Business Organization",
                        "Read?": "Yes"
                    }
                ]
            }
        }
    },
    {
        'id': 15,
        'page_id': 1,
        'template_id': 1,
        'content': {
            'header': ["Example Ordered Lists"],
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
        'id': 16,
        'page_id': 13,
        'template_id': 13,
        'content': {
            "header": ["Project Management Template"],
            "table": {
                "columns": [
                    "Project Name",
                    "Status",
                    "Start Date",
                    "End Date",
                    "Priority"
                ],
                "rows": [
                    {
                        "Project Name": "Website Redesign",
                        "Status": "In Progress",
                        "Start Date": "2023-01-10",
                        "End Date": "2023-04-30",
                        "Priority": "High"
                    },
                    {
                        "Project Name": "Mobile App Development",
                        "Status": "Not Started",
                        "Start Date": "2023-05-01",
                        "End Date": "2023-08-31",
                        "Priority": "Medium"
                    },
                    {
                        "Project Name": "SEO Optimization",
                        "Status": "Completed",
                        "Start Date": "2022-09-01",
                        "End Date": "2022-12-31",
                        "Priority": "Low"
                    },
                    {
                        "Project Name": "Social Media Campaign",
                        "Status": "In Progress",
                        "Start Date": "2023-02-01",
                        "End Date": "2023-04-15",
                        "Priority": "Medium"
                    }
                ]
            }
        }
    },
    {
        'id': 17,
        'page_id': 1,
        'template_id': 1,
        'content': {
            "header": ["Project Management Template"],
            "table": {
                "columns": [
                    "Project Name",
                    "Status",
                    "Start Date",
                    "End Date",
                    "Priority"
                ],
                "rows": [
                    {
                        "Project Name": "Website Redesign",
                        "Status": "In Progress",
                        "Start Date": "2023-01-10",
                        "End Date": "2023-04-30",
                        "Priority": "High"
                    },
                    {
                        "Project Name": "Mobile App Development",
                        "Status": "Not Started",
                        "Start Date": "2023-05-01",
                        "End Date": "2023-08-31",
                        "Priority": "Medium"
                    },
                    {
                        "Project Name": "SEO Optimization",
                        "Status": "Completed",
                        "Start Date": "2022-09-01",
                        "End Date": "2022-12-31",
                        "Priority": "Low"
                    },
                    {
                        "Project Name": "Social Media Campaign",
                        "Status": "In Progress",
                        "Start Date": "2023-02-01",
                        "End Date": "2023-04-15",
                        "Priority": "Medium"
                    }
                ]
            }
        }
    },
        {
        'id': 18,
        'page_id': 2,
        'template_id': 2,
        'content': {
            "header": ["Project Management Template"],
            "table": {
                "columns": [
                    "Project Name",
                    "Status",
                    "Start Date",
                    "End Date",
                    "Priority"
                ],
                "rows": [
                    {
                        "Project Name": "Website Redesign",
                        "Status": "In Progress",
                        "Start Date": "2023-01-10",
                        "End Date": "2023-04-30",
                        "Priority": "High"
                    },
                    {
                        "Project Name": "Mobile App Development",
                        "Status": "Not Started",
                        "Start Date": "2023-05-01",
                        "End Date": "2023-08-31",
                        "Priority": "Medium"
                    },
                    {
                        "Project Name": "SEO Optimization",
                        "Status": "Completed",
                        "Start Date": "2022-09-01",
                        "End Date": "2022-12-31",
                        "Priority": "Low"
                    },
                    {
                        "Project Name": "Social Media Campaign",
                        "Status": "In Progress",
                        "Start Date": "2023-02-01",
                        "End Date": "2023-04-15",
                        "Priority": "Medium"
                    }
                ]
            }
        }
    }
]

    for block in blocks:
        db.session.add(Block(
            id = block['id'],
            page_id = block['page_id'],
            template_id = block['template_id'],
            content = block['content'],
        ))

    db.session.commit()

def undo_blocks():
    if environment == "production": 
        db.session.execute(f"TRUNCATE table {SCHEMA}.blocks RESTART IDENTITY CASCADE;")
    else: 
        db.session.execute(text("DELETE FROM blocks"))
    
    db.session.commit()