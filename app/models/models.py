from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'Users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    workspaces = db.relationship("Workspace", back_populates="users")


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }



## Workspace Models

class Workspace(db.Model):
    __tablename__ = 'Workspaces'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    workspace_id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("Users.id")), nullable=False)
    name = db.Column(db.String(100), nullable=False)

    users = db.relationship("User", back_populates="workspaces")
    pages = db.relationship("Page", back_populates="workspaces")

    def to_dict(self):
        return {
            'workspace_id': self.workspace_id,
            'user_id': self.user_id,
            'name': self.name,
        }


## Page Models
class Page(db.Model):
    __tablename__ = 'Pages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    page_id = db.Column(db.Integer, primary_key=True, nullable=False)
    workspace_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("Workspaces.workspace_id")), nullable=False)
    template_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("Templates.template_id")), nullable=False)
    name = db.Column(db.String(255), nullable=False)

    workspaces = db.relationship('Workspace', back_populates="pages")
    templates = db.relationship('Template', back_populates="pages")
    blocks = db.relationship('Block', back_populates="pages")

    def to_dict(self):
        return {
            'page_id': self.page_id,
            'workspace_id': self.workspace_id,
            'template_id': self.template_id,
            'name': self.name
        }

## Template Models
class Template(db.Model):
    __tablename__ = 'Templates'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    template_id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    content = db.Column(db.JSON, nullable = False)

    pages = db.relationship("Page", back_populates="templates")

    def to_dict(self):
        return {
            'template_id': self.template_id,
            'name': self.name,
            'content': self.content,
        }


## Blocks Models
class Block(db.Model):
    __tablename__ = 'Blocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    block_id = db.Column(db.Integer, primary_key=True, nullable=False)
    page_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("Pages.page_id")), nullable=False)
    type_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("BlockTypes.type_id")), nullable=False)
    text_block = db.Column(db.JSON, nullable=True)
    code_block = db.Column(db.JSON, nullable=True)
    database_block = db.Column(db.JSON, nullable=True)
    boardview_block = db.Column(db.JSON, nullable=True)
    heading_block = db.Column(db.JSON, nullable=True)
    table_block = db.Column(db.JSON, nullable=True)
    bulleted_list_block = db.Column(db.JSON, nullable=True)   
    block_order = db.Column(db.Integer, nullable=False)

    block_types = db.relationship("BlockType", back_populates = "blocks")
    pages = db.relationship("Page", back_populates = "blocks")

    def to_dict(self):
        return {
            'block_id': self.block_id,
            'page_id': self.page_id,
            'type_id': self.type_id,
            'text_block': self.text_block,
            'code_block': self.code_block,
            'database_block': self.database_block,
            'boardview_block': self.boardview_block,
            'heading_block': self.heading_block,
            'table_block': self.table_block,
            'bulleted_list_block': self.bulleted_list_block,
            'block_order': self.block_order
        }

## BlockTypes Model
class BlockType(db.Model):
    __tablename__ = 'BlockTypes'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    type_id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(255), nullable=False)

    blocks = db.relationship("Block", back_populates = 'block_types')

    def to_dict(self):
        return {
            'type_id': self.type_id,
            'name': self.name,
        }
