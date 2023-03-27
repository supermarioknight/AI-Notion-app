from flask import Blueprint, request, jsonify
from app.models import Block, Page, Template
from app.models.db import db
from flask_login import login_required, current_user

block_routes = Blueprint('blocks', __name__)

@block_routes.route('/<int:id>')
@login_required
def block_by_id(id):
    """Route for getting a specific block by id"""
    block = Block.query.get(id)
    if not block:
        return jsonify(error="Block not found"), 404
    return block.to_dict()



@block_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_block_by_id(id):
    """Route for updating a specific block by id"""
    block = Block.query.get(id)
    if not block:
        return jsonify(error="Block not found"), 404

    res = request.get_json()
    block.content = res.get('content', block.content)
    db.session.commit()

    return block.to_dict()



@block_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_block_by_id(id):
    """Route for deleting a specific block by id"""
    block = Block.query.get(id)
    if not block:
        return jsonify(error="Block not found"), 404

    db.session.delete(block)
    db.session.commit()
    return "Successfully deleted block"


@block_routes.route('/', methods=["POST"])
@login_required
def create_block():
    """Route for creating a new block"""
    res = request.get_json()
    page_id = res.get('page_id')
    template_id = res.get('template_id')
    content = res.get('content')

    if not page_id and not template_id:
        return jsonify(error="Page or template ID must be provided"), 400

    if page_id:
        page = Page.query.get(page_id)
        if not page:
            return jsonify(error="Page not found"), 404

        block = Block(page_id=page.id, content=content)
        db.session.add(block)
        db.session.commit()
        return block.to_dict()

    if template_id:
        template = Template.query.get(template_id)
        if not template:
            return jsonify(error="Template not found"), 404

        block = Block(template_id=template.id, content=content)
        db.session.add(block)
        db.session.commit()
        return block.to_dict()


@block_routes.route('/pages/<int:page_id>/blocks', methods=["POST"])
@login_required
def create_block_on_page(page_id):
    """Route for creating a new block associated with a specific page by page_id"""
    page = Page.query.get(page_id)
    if not page:
        return jsonify(error="Page not found"), 404

    res = request.get_json()
    content = res.get('content')
    block = Block(page_id=page.id, content=content)
    db.session.add(block)
    db.session.commit()

    return block.to_dict()

