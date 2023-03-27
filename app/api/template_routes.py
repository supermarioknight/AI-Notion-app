from flask import Blueprint, request, jsonify
from app.models import Template, Block
from app.models.db import db
from flask_login import login_required

template_routes = Blueprint('templates', __name__)

@template_routes.route("/")
@login_required
def get_all_templates():
    """Route for getting all templates"""
    templates = Template.query.all()
    return jsonify([t.to_dict() for t in templates])

@template_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_a_template(id):
    """Delete a template by template id"""
    template = Template.query.get(id)

    if not template:
        return jsonify(error="Template not found"), 404

    db.session.delete(template)
    db.session.commit()

    return "Successfully Deleted"

@template_routes.route('/<int:id>', methods=["PUT"])
@login_required
def edit_a_template(id):
    """Route for updating a template by template id"""
    res = request.get_json()
    template = Template.query.get(id)

    if not template:
        return jsonify(error="Template not found"), 404

    template.name = res['name']
    
    for block in template.blocks:
        block_id = block.block_id
        block_content = res['blocks'].get(str(block_id))

        if block_content: 
            block.content = block_content

    db.session.commit()

    return template.to_dict()

@template_routes.route('/', methods=["POST"])
@login_required
def create_a_template():
    """Route for creating a new template"""
    res = request.get_json()
    create_template = Template(name=res['name'])
    db.session.add(create_template)
    db.session.flush()

    blocks = []
    for block_data in res["blocks"]:
        block = Block(
            page_id=None,
            template_id=create_template.template_id,
            content=block_data["content"]
        )
        blocks.append(block)
        db.session.add(block)

    create_template.blocks = blocks
    db.session.commit()

    return create_template.to_dict()
