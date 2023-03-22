from flask import Blueprint, request, jsonify
from app.models import Workspace, Page, Block, Template
from app.models.db import db
from flask_login import login_required, current_user

page_routes = Blueprint('pages', __name__)


@page_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_a_page_by_page_id(id):
    """Route for updating a page by page id"""
    res = request.get__json()

    page = Page.query.get(id)

    page.name = res['name']

    for block in page.blocks:
        block_id = block.block_id
        block_content = res['blocks'].get(str(block_id))

        if block_content:
            block.content = block_content
    
    db.session.commit()

    return page.to_dict()

@page_routes.route('/', methods=["POST"])
@login_required
def create_a_page_by_workspace_id():
    """Route for creating a page by workspace by id"""
    res = request.get_json()

    create_page = Page(
        workspace_id = res['workspace_id'],
        name = res['name']
    )

    db.session.add(create_page)
    db.session.flush()

    blocks = []
    for block_data in res["blocks"]:
        block = Block(
            page_id = create_page.page_id,
            content = block_data["content"]
        )
    
    blocks.append(block)
    db.session.add(block)

    return create_page.to_dict()


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



