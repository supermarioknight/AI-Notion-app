from app.models import db, Workspace, environment, SCHEMA
from sqlalchemy.sql import text


# Adds demo Workspaces, you can add other portfolios here if you want

def seed_workspaces():
    workspaces = [
        {'user_id': 1, 'name': 'Personal'},
        {'user_id': 1, 'name': 'Business'},
        {'user_id': 1, 'name': 'Templates'},
        {'user_id': 2, 'name': 'Freedom'},
        {'user_id': 2, 'name': 'Work'},
        {'user_id': 2, 'name': 'Philosophy'},
        {'user_id': 3, 'name': 'Personal'},
        {'user_id': 3, 'name': 'Business'},
        {'user_id': 3, 'name': 'Pleasure'},
    ]

    for workspace in workspaces:
        db.session.add(Workspace(
            user_id = workspace['user_id'],
            name = workspace['name']
        ))

    db.session.commit()

def undo_workspaces():
    if environment == "production": 
        db.session.execute(f"TRUNCATE table {SCHEMA}.workspaces RESTART IDENTITY CASCADE;")
    else: 
        db.session.execute(text("DELETE FROM workspaces"))
    
    db.session.commit()
    