from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Workspace, User, Page, Block
from app.models.db import db

workspace_routes = Blueprint('workspaces', __name__)
    
@workspace_routes.route('/')
@login_required
def workspace_all_by_user_id():
    """Route for getting all workspaces by user Id"""
    workspaces = current_user.workspaces
    return jsonify([w.to_dict() for w in workspaces])


@workspace_routes.route('/<int:id>')
@login_required
def workspace_by_id(id):
    """Route for getting a specific workspace for a user"""
    workspace = Workspace.query.filter_by(id=id, user_id=current_user.id).first()
    if workspace:
        return workspace.to_dict()
    else:
        return jsonify(error="Workspace not found"), 404



@workspace_routes.route('/', methods=['POST'])
@login_required
def create_workspace_by_user_id(): 
    """Route for creating a workspace by user id"""
    res = request.get_json()

    new_workspace = Workspace(name=res['name'], user_id=current_user.id)
    db.session.add(new_workspace)
    db.session.commit()

    return jsonify(new_workspace.to_dict())



@workspace_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_workspace_by_id(id):
    """Route for deleting a workspace by workspace id"""
    workspace = Workspace.query.get(id)

    if not workspace:
        return jsonify(error="Workspace not found"), 404

    db.session.delete(workspace)
    db.session.commit()
    return jsonify(message="Workspace deleted successfully")




@workspace_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_workspace_by_id(id):
    """Route to update a workspace by workspace id"""
    res = request.get_json()
    workspace = Workspace.query.get(id)
    

    if not workspace:
        return jsonify(error="Workspace not found"), 404

    workspace.name = res['name']
    db.session.commit()
    return workspace.to_dict()




@workspace_routes.route('/<int:id>/pages', methods=["POST"])
@login_required
def create_page(workspace_id):
    """Route to create a page in a workspace"""
    workspace = Workspace.query.filter_by(id=workspace_id, user_id=current_user.id).first()

    if not workspace:
        return jsonify(error="Workspace not found"), 404

    res = request.get_json()
    template_id = res.get('template_id')

    new_page = Page(name=res['name'], workspace_id=workspace.id, template_id=template_id)
    db.session.add(new_page)
    db.session.commit()

    return new_page.to_dict()




@workspace_routes.route('/<int:workspace_id>/pages')
@login_required
def get_pages_by_workspace_id(workspace_id):
    """Route for getting all pages in a workspace"""
    workspace = Workspace.query.filter_by(id=workspace_id, user_id=current_user.id).first()

    if not workspace:
        return jsonify(error="Workspace not found"), 404

    pages = Page.query.filter_by(workspace_id=workspace.id).all()

    # Create a dictionary containing the workspace and pages
    response = {
        'workspace': workspace.to_dict(),
        'pages': [page.to_dict() for page in pages]
    }

    return jsonify(response)




@workspace_routes.route('/<int:workspace_id>/pages/<int:page_id>')
@login_required
def get_page(workspace_id, page_id):
    """Route for getting a specific page in a workspace"""
    workspace = Workspace.query.filter_by(id=workspace_id, user_id=current_user.id).first()

    if not workspace:
        return jsonify(error="Workspace not found"), 404

    page = Page.query.filter_by(id=page_id, workspace_id=workspace.id).first()
