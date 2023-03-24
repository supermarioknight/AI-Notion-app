from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Workspace, User, Page
from app.models.db import db

workspace_routes = Blueprint('workspaces', __name__)
    
##? Confirmed Working
@workspace_routes.route('/')
@login_required
def workspace_all_by_user_id():
    """Route for getting all workspaces by user Id"""
    workspace = Workspace.query.filter(Workspace.user_id == current_user.id).all()
    print(current_user.id)
    return jsonify([w.to_dict() for w in workspace])

##? Confirmed Working
@workspace_routes.route('/<int:id>')
@login_required
def workspace_by_id(id):
    """Route for getting a specific workspace for a user"""
    workspace = Workspace.query.filter_by(workspace_id=id, user_id=current_user.id).first()
    return workspace.to_dict()



@workspace_routes.route('/', methods=['POST'])
@login_required
def create_workspace_by_user_id(): 
    """Route for creating a workspace by user id"""
    res = request.get_json()

    new_workspace = Workspace(name=res['name'], user_id=current_user.id)
    db.session.add(new_workspace)
    db.session.commit()

    return new_workspace.to_dict()



@workspace_routes.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_workspace_by_id(id):
    """Route for deleting a workspace by workspace id"""
    workspace = Workspace.query.get(id)

    if not workspace:
        return "Specified workspace does not exist"
    
    db.session.delete(workspace)
    db.session.commit()
    return "Successfully Deleted"



@workspace_routes.route('/<int:id>', methods=["PUT"])
@login_required
def update_workspace_by_id(id):
    """Route to update a workspace by workspace id"""
    res = request.get_json()
    workspace = Workspace.query.get(id)

    workspace.name = res['name']
    db.session.commit()
    return workspace.to_dict()




