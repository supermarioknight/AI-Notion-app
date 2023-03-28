from app.models import db, Page, environment, SCHEMA
from sqlalchemy.sql import text


def seed_pages():
    pages = [    
            {'workspace_id': 1, 'template_id': 1, 'name': 'Getting Started'},    
            {'workspace_id': 1, 'template_id': 2, 'name': 'Lists'},    
            {'workspace_id': 1, 'template_id': 3, 'name': 'Reading List'},    
            {'workspace_id': 1, 'template_id': 4, 'name': 'To-Dos'},    
            {'workspace_id': 1, 'template_id': 5, 'name': 'Code Block'},   
            {'workspace_id': 1, 'template_id': 6, 'name': 'Tables'},
            {'workspace_id': 3, 'template_id': 7, 'name': 'Blank Page'},
            {'workspace_id': 2, 'template_id': 8, 'name': 'Blank Database'},
            {'workspace_id': 2, 'template_id': 9, 'name': 'Blank Kanban Template'},
            {'workspace_id': 3, 'template_id': 10, 'name': 'Blank Tables Template'},
            {'workspace_id': 3, 'template_id': 11, 'name': 'Blank Code Block Template'},        
            {'workspace_id': 3, 'template_id': 12, 'name': 'Blank List Template'}, 
            {'workspace_id': 1, 'template_id': 13, 'name': 'Project Management Template'}
        ]

    for page in pages:
        db.session.add(Page(
            workspace_id = page['workspace_id'],
            template_id = page['template_id'],
            name = page['name']
        ))
    
    db.session.commit()


def undo_pages():
    if environment == "production": 
        db.session.execute(f"TRUNCATE table {SCHEMA}.pages RESTART IDENTITY CASCADE;")
    else: 
        db.session.execute(text("DELETE FROM pages"))
    
    db.session.commit()