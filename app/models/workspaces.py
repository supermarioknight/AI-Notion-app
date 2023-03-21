from .db import db, environment, SCHEMA, add_prefix_for_prod

class Workspace(db.Model):
    __tablename__ = 'workspaces'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

         