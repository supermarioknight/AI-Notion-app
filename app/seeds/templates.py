from app.models import db, Template, environment, SCHEMA
from sqlalchemy.sql import text

def seed_templates():
    templates = [
        {'id': 1, 'name': 'Getting Started Template'},
        {'id': 2, 'name': 'List Template'},
        {'id': 3, 'name': 'Reading List Template'},
        {'id': 4, 'name': 'To-Do Template'},
        {'id': 5, 'name': 'Code Block Template'},
        {'id': 6, 'name': 'Tables Template'},
        {'id': 7, 'name': 'Blank Page Template'},
        {'id': 8, 'name': 'Blank Database Template'},
        {'id': 9, 'name': 'Blank To-Do Template'},
        {'id': 10, 'name': 'Blank Tables Template'},
        {'id': 11, 'name': 'Blank Code Block Template'},
        {'id': 12, 'name': "Ordered List Template"},
        {'id': 13, 'name': 'Project Management Template'}
    ]

    for template in templates:
        db.session.add(Template(
            id = template['id'],
            name = template['name'],
        ))

    db.session.commit()

def undo_templates():
    if environment == "production": 
        db.session.execute(f"TRUNCATE table {SCHEMA}.templates RESTART IDENTITY CASCADE;")
    else: 
        db.session.execute(text("DELETE FROM templates"))
    
    db.session.commit()