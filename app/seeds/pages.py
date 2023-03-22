from app.models import db, Page, environment, SCHEMA
from sqlalchemy.sql import text


def seed_pages():
    pages = [    
            {'page_id': 1, 'workspace_id': 1, 'template_id': 1, 'name': 'Getting Started'},    
            {'page_id': 2, 'workspace_id': 1, 'template_id': 2, 'name': 'Lists'},    
            {'page_id': 3, 'workspace_id': 1, 'template_id': 3, 'name': 'Reading List'},    
            {'page_id': 4, 'workspace_id': 1, 'template_id': 4, 'name': 'To-Dos'},    
            {'page_id': 5, 'workspace_id': 1, 'template_id': 5, 'name': 'Code Block'},   
            {'page_id': 6, 'workspace_id': 1, 'template_id': 6, 'name': 'Tables'},    
        ]

    for page in pages:
        db.session.add(Page(
            page_id = page['page_id'],
            workspace_id = page['workspace_id'],
            template_id = page['template_id'],
            name = page['name']
        ))
    
    db.session.commit()


def undo_pages():
    if environment == "production": 
        db.session.execute(f"TRUNCATE table {SCHEMA}.Pages RESTART IDENTITY CASCADE;")
    else: 
        db.session.execute(text("DELETE FROM Pages"))
    
    db.session.commit()