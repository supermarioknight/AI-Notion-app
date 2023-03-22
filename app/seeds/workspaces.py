from app.models import db, Workspace, environment, SCHEMA
from sqlalchemy.sql import text


# Adds demo Workspaces, you can add other portfolios here if you want

def seed_workspaces():
    workspaces = [
        {'workspace_id': 1, 'user_id': 1, 'name': 'Personal'},
        {'workspace_id': 2, 'user_id': 1, 'name': 'Business'},
        {'workspace_id': 3, 'user_id': 1, 'name': 'Pleasure'},
        {'workspace_id': 4, 'user_id': 2, 'name': 'Freedom'},
        {'workspace_id': 5, 'user_id': 2, 'name': 'Work'},
        {'workspace_id': 6, 'user_id': 2, 'name': 'Philosophy'},
        {'workspace_id': 7, 'user_id': 3, 'name': 'Personal'},
        {'workspace_id': 8, 'user_id': 3, 'name': 'Business'},
        {'workspace_id': 9, 'user_id': 3, 'name': 'Pleasure'},
    ]

    for workspace in workspaces:
        db.session.add(Workspace(
            workspace_id = workspace['workspace_id'],
            user_id = workspace['user_id'],
            name = workspace['name']
        ))

    db.session.commit()

def undo_workspaces():
    if environment == "production": 
        db.session.execute(f"TRUNCATE table {SCHEMA}.Workspaces RESTART IDENTITY CASCADE;")
    else: 
        db.session.execute(text("DELETE FROM Workspaces"))
    
    db.session.commit()
    