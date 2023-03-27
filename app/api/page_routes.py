from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Workspace, Page, Block, Template
from app.models.db import db

page_routes = Blueprint('pages', __name__)



@page_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_a_page_by_page_id(id):
    """Route for updating a page by page id"""
    res = request.get_json()

    page = Page.query.get(id)

    if not page:
        return "Specified page does not exist"

    page.name = res['name']
    
    db.session.commit()

    return page.to_dict()


@page_routes.route('/<int:id>')
@login_required
def get_page_content_by_id(id):
    """Route for getting the content of a page by its id"""
    page = Page.query.get(id)

    if not page:
        return jsonify({"message": "Specified page does not exist"})

    content = []
    for block in page.blocks:
        content.append(block.content)
    
    return jsonify({"blocks": content, "id": id})


@page_routes.route('/', methods=["POST"])
@login_required
def create_a_page_by_workspace_id():
    """Route for creating a page by workspace by id"""
    res = request.get_json()

    workspace = Workspace.query.filter_by(id=res['workspace_id'], user_id=current_user.id).first()

    if not workspace:
        return "Specified workspace does not exist"

    new_page = Page(
        workspace_id=res['workspace_id'],
        name=res['name']
    )

    db.session.add(new_page)
    db.session.commit()

    starter_content = [
        {
            "content": {
                "header": ["Welcome to your new page where ideas get created!"],
                "text": ["This is some example text to get you started."]

            }
        }
    ]

    if not res["blocks"]:  # If no blocks are provided, use the starter content
        res["blocks"] = starter_content

    for block_data in res["blocks"]:
        block = Block(
            page_id=new_page.id,
            content=block_data["content"]
        )
        db.session.add(block)

    db.session.commit()

    return new_page.to_dict()


@page_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_a_page_by_page_id(id):
    """Delete a page by page id"""

    page = Page.query.get(id)

    if not page:
        return jsonify({'status': 'error', 'message': 'Specified page does not exist'}), 404

    db.session.delete(page)
    db.session.commit()
    return jsonify({'status': 'success', 'message': 'Page deleted successfully'}), 200


@page_routes.route('/<int:id>/blocks', methods=["PUT"])
@login_required
def update_page_blocks(id):
    """Route for updating the content of blocks within a page"""
    res = request.get_json()

    page = Page.query.get(id)

    if not page:
        return jsonify({"message": "Specified page does not exist"}), 404

    # Assuming 'blocks' is a list of dictionaries with block_id and content keys
    updated_blocks = res.get('blocks', [])

    for updated_block in updated_blocks:
        block = Block.query.get(updated_block['block_id'])
        if block and block.page_id == id:
            block.content = updated_block['content']
        else:
            return jsonify({"message": f"Block with id {updated_block['block_id']} not found in the specified page"}), 404

    db.session.commit()

    return jsonify({"message": "Page blocks updated successfully"}), 200