from app.models import db, Template, environment, SCHEMA
from sqlalchemy.sql import text

def seed_templates():
    templates = [
        {'name': 'Getting Started Template'},
        {'name': 'List Template'},
        {'name': 'Reading List Template'},
        {'name': 'To-Do Template'},
        {'name': 'Code Block Template'},
        {'name': 'Tables Template'},
        {'name': 'Blank Page Template'},
        {'name': 'Blank Database Template'},
        {'name': 'Blank To-Do Template'},
        {'name': 'Blank Tables Template'},
        {'name': 'Blank Code Block Template'},
        {'name': "Ordered List Template"},
        {'name': 'Project Management Template'}
    ]

    for template in templates:
        db.session.add(Template(
            name = template['name'],
        ))

    db.session.commit()

def undo_templates():
    if environment == "production": 
        db.session.execute(f"TRUNCATE table {SCHEMA}.templates RESTART IDENTITY CASCADE;")
    else: 
        db.session.execute(text("DELETE FROM templates"))
    
    db.session.commit()