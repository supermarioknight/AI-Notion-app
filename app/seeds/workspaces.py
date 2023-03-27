from app.models import db, Workspace, environment, SCHEMA
from sqlalchemy.sql import text


# Adds demo Workspaces, you can add other portfolios here if you want

def seed_workspaces():
    workspaces = [
        {'id': 1, 'user_id': 1, 'name': 'Personal'},
        {'id': 2, 'user_id': 1, 'name': 'Business'},
        {'id': 3, 'user_id': 1, 'name': 'Templates'},
        {'id': 4, 'user_id': 2, 'name': 'Freedom'},
        {'id': 5, 'user_id': 2, 'name': 'Work'},
        {'id': 6, 'user_id': 2, 'name': 'Philosophy'},
        {'id': 7, 'user_id': 3, 'name': 'Personal'},
        {'id': 8, 'user_id': 3, 'name': 'Business'},
        {'id': 9, 'user_id': 3, 'name': 'Pleasure'},
    ]

    for workspace in workspaces:
        db.session.add(Workspace(
            id = workspace['id'],
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
    