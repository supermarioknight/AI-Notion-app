from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.sql import text

class User(db.Model, UserMixin):
    __tablename__ = 'users'

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
    __tablename__ = 'workspaces'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")), nullable=False)
    name = db.Column(db.String(100), nullable=False)

    users = db.relationship("User", back_populates="workspaces")
    pages = db.relationship("Page", back_populates="workspaces", cascade='all, delete, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'name': self.name,
        }

## Page Models
class Page(db.Model):
    __tablename__ = 'pages'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True, nullable=False)
    workspace_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("workspaces.id")), nullable=False)
    template_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("templates.id")), nullable=True) 
    name = db.Column(db.String(255), nullable=False)

    workspaces = db.relationship('Workspace', back_populates="pages")
    template = db.relationship('Template', back_populates="pages")
    blocks = db.relationship('Block', back_populates="pages", cascade='all, delete, delete-orphan')

    def to_dict(self):
        return {
            'id': self.id,
            'workspace_id': self.workspace_id,
            'template_id': self.template_id,
            'name': self.name,
            'blocks': [block.to_dict() for block in self.blocks]
        }


## Template Models
class Template(db.Model):
    __tablename__ = 'templates'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    name = db.Column(db.String(100), nullable=False)

    blocks = db.relationship("Block", back_populates="template")
    pages = db.relationship("Page", back_populates="template")

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            # 'blocks': [block.to_dict() for block in self.blocks]
        }
        

## Blocks Models
class Block(db.Model):
    __tablename__ = 'blocks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True, nullable=False)
    page_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("pages.id")), nullable=False)
    template_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("templates.id")), nullable=True) 
    content = db.Column(db.JSON, nullable=True)
    parent_block_id = db.Column(db.Integer, nullable=True)
    

    pages = db.relationship("Page", back_populates = "blocks")
    template = db.relationship("Template", back_populates="blocks", uselist=False)

    def to_dict(self):
        return {
            'id': self.id,
            'page_id': self.page_id,
            'template_id': self.template_id,
            'content': self.content,
        }
