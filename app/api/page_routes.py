from flask import Blueprint, request, jsonify
from app.models import Workspace, Page, Block, Template
from app.models.db import db
from flask_login import login_required, current_user

page_routes = Blueprint('pages', __name__)

@page_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_a_page_by_page_id(id):
    """Route for updating a page by page id"""
    page = Page.query.get(id)


    if page is None or page.workspace.user_id != current_user.id:
        return {"error": "Page not found or unauthorized"}, 404
    
    if "name" in request.json:
        page.name = request.json["name"]

    if "template_id" in request.json:
        template_id = request.json["template_id"]
        template = Template.query.get(template_id)
        if template is None or template.workspace_id != page.workspace_id:
            return {"error": "Template not found or unauthorized"}, 404
        page.template_id = template_id
    
    db.session.commit()

    return page.to_dict()

@page_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_a_page_by_page_id(id):
    """Delete a page by page id"""

    page = Page.query.get(id)

    if not page:
        return "Specified page does not exist"
    
    db.session.delete(page)
    db.session.commit()
    return "Successfully Deleted"



@page_routes.route('/<int:id>')
@login_required
def get_all_blocks_by_page_id(id):
    """get all blocks by page id"""
    page = Page.query.get(id)

    blocks = Block.filter_by(page_id=id).all()

    return {"page": page.to_dict(), "blocks": [b.to_dict() for b in blocks]} 

