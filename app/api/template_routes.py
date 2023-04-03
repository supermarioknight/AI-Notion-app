from flask import Blueprint, request, jsonify
from app.models import Template 
from app.models.db import db
from flask_login import login_required
import json

template_routes = Blueprint('templates', __name__)

@template_routes.route("/")
@login_required
def get_all_templates():
    """Route for getting all templates"""
    templates = Template.query.all()
    return jsonify([{
        'id': t.id,
        'name': t.name,
        'content': json.loads(t.content)
    } for t in templates])

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


@template_routes.route('/', methods=["POST"])
@login_required
def create_a_template():
    """Route for creating a new template"""
    res = request.get_json()
    create_template = Template(name=res['name'], content=json.dumps(res['content']))
    db.session.add(create_template)
    db.session.commit()

    return create_template.to_dict()
