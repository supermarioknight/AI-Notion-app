from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Workspace, Page, Template
from app.models.db import db
import json


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
    page.content = json.dumps(res['content'])
    
    db.session.commit()

    return page.to_dict()



@page_routes.route('/<int:id>')
@login_required
def get_page_content_by_page_id(id):
    """Route for getting the content of a page by its id"""
    page = Page.query.get(id)

    if not page:
        return jsonify({"message": "Specified page does not exist"})

    return jsonify({"content": page.content})



@page_routes.route('/', methods=["POST"])
@login_required
def create_a_page_by_workspace_id():
    """Route for creating a page by workspace by id"""
    res = request.get_json()

    workspace = Workspace.query.filter_by(id=res['workspace_id'], user_id=current_user.id).first()

    if not workspace:
        return "Specified workspace does not exist"
    
    starter_content = {
        "ops": [
            {
                "insert": "Welcome to your new page where ideas get created!"
            },
            {
                "attributes": {
                    "header": 1
                },
                "insert": "\n"
            },
            {
                "insert": "This is some example text to get you started."
            }
        ]
    }

    new_page = Page(
        workspace_id=res['workspace_id'],
        name=res['name'],
        content=starter_content
    )

    db.session.add(new_page)
    db.session.commit()

    return jsonify(new_page.to_dict())


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

