from flask import Blueprint, request, jsonify
from app.models import Page, Block, BlockType


block_routes = Blueprint('blocks', __name__)

