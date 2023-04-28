from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Workspace, Page, Template
from app.models.db import db
import os
import openai 
from dotenv import load_dotenv
load_dotenv()

openai.api_key = os.environ.get("OPENAI_API_KEY2")



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
    page.content = res['content']

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


@page_routes.route('/<int:id>/summarize', methods=["POST"])
@login_required
def summarize_page_by_page_id(id):
    """Route for summarizing a page by page id"""
    page = Page.query.get(id)
    data = request.get_json()

    if not page:
        return jsonify({"message": "Specified page does not exist"})

    content = data['content']

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": "You are a helpful assistant helping the user summarize content."},
                {"role": "user", "content": f"Summarize this content: {content}"},

        ],
        temperature = 1, 
        max_tokens = 750,
        n = 1,
    )
    summary = completion.choices[0].message["content"]

    # Update the page with the bot's response
    page.content = summary
    db.session.commit()

    return jsonify({"summary": summary})



@page_routes.route('/<int:id>/table', methods=["POST"])
@login_required
def table_page_by_page_id(id):
    """Route for creating a table of a page by page id"""
    page = Page.query.get(id)
    data = request.get_json()

    if not page:
        return jsonify({"message": "Specified page does not exist"})

    content = data['content']

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": "You are a helpful assistant helping the user understand the content as if they were a 6 year old."},
                {"role": "user", "content": f"Can you tell me about this as if I were a child?: {content}"},

        ],
        temperature = 1,
        max_tokens = 500,
        n = 1,
    )
    table = completion.choices[0].message["content"]

    # Update the page with the bot's response
    page.content = table
    db.session.commit()

    return jsonify({"table": table})
    

@page_routes.route('/<int:id>/code', methods=["POST"])
@login_required
def code_page_by_page_id(id):
    """Route for creating a code of a page by page id"""
    page = Page.query.get(id)
    data = request.get_json()

    if not page:
        return jsonify({"message": "Specified page does not exist"})

    content = data['content']
    code = data['code']

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": "You are a helpful assistant helping the user create code from the content they sends you."},
                {"role": "user", "content": f"Can you help me code this?: {code}"},


        ],
        temperature = 1,
        max_tokens = 1000,
        n = 1,
    )
    code = completion.choices[0].message["content"]

    # Update the page with the bot's response
    page.content = code
    db.session.commit()

    return jsonify({"code": code})


@page_routes.route('/<int:id>/storytime', methods=["POST"])
@login_required
def story_page_by_page_id(id):
    """Route for creating a story of a page by page id"""
    page = Page.query.get(id)
    data = request.get_json()

    if not page:
        return jsonify({"message": "Specified page does not exist"})

    content = data['content']
    topic = data['topic']

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": "You are a helpful assistant helping the user create a story based on a topic the user sends to you. The story will be fiction"},
                {"role": "user", "content": f"I would like a story based on this topic: {topic}"},

        ],
        temperature = 1,
        max_tokens = 1000,
        n = 1,
    )
    story = completion.choices[0].message["content"]

    # Update the page with the bot's response
    page.content = story
    db.session.commit()

    return jsonify({"story": story})


@page_routes.route('/<int:id>/journal', methods=["POST"])
@login_required
def journal_page_by_page_id(id):
    """Route for creating a journal prompt of a page by page id"""
    page = Page.query.get(id)
    data = request.get_json()

    if not page:
        return jsonify({"message": "Specified page does not exist"})

    content = data['content']
    topic = data['topic']

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": "You are a helpful assistant providing journal prompts to the user based on the topics they send to you"},
                {"role": "user", "content": f"I need a couple journal prompts based on these topics: {topic}"},

        ],
        temperature = 1,
        max_tokens = 1000,
        n = 1,
    )
    journal = completion.choices[0].message["content"]

    # Update the page with the bot's response
    page.content = journal
    db.session.commit()

    return jsonify({"journal": journal})


@page_routes.route('/<int:id>/cover', methods=["POST"])
@login_required
def cover_page_by_page_id(id):
    """Route for suggesting names on a page by page id"""
    page = Page.query.get(id)
    data = request.get_json()

    if not page:
        return jsonify({"message": "Specified page does not exist"})

    content = data['content']
    topic = data['topic']

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": "You are a helpful assistant helping the user create a cover letter based on position, company, and techstack"},
                {"role": "user", "content": f"I need a cover letter based on this position, company, and tech stack: {topic}"},

        ],
        temperature = 1,
        max_tokens = 1000,
        n = 1,
    )
    cover = completion.choices[0].message["content"]

    # Update the page with the bot's response
    page.content = cover
    db.session.commit()

    return jsonify({"cover": cover})


@page_routes.route('/<int:id>/thank', methods=["POST"])
@login_required
def thank_page_by_page_id(id):
    """Route for suggesting names on a page by page id"""
    page = Page.query.get(id)
    data = request.get_json()

    if not page:
        return jsonify({"message": "Specified page does not exist"})

    content = data['content']
    topic = data['topic']

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": "You are a helpful assistant helping the user create a thank you note for the hiring manager after the user interviewed."},
                {"role": "user", "content": f"I need a thank you note for the hiring manager that just interviewed me at this company for this position: {topic}"},

        ],
        temperature = 1,
        max_tokens = 2500,
        n = 1,
    )
    thankyou = completion.choices[0].message["content"]

    # Update the page with the bot's response
    page.content = thankyou
    db.session.commit()

    return jsonify({"thankyou": thankyou})


@page_routes.route('/<int:id>/translate', methods=["POST"])
@login_required
def translate_page_by_page_id(id):
    """Route for suggesting names on a page by page id"""
    page = Page.query.get(id)
    data = request.get_json()

    if not page:
        return jsonify({"message": "Specified page does not exist"})

    content = data['content']
    language = data['language']

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": "You are a helpful assistant helping the user translate the content into a language he sends to you."},
                {"role": "user", "content": f"I need help translating this page: {content}, in this language: {language}"},

        ],
        temperature = 1,
        max_tokens = 1000,
        n = 1,
    )
    translate = completion.choices[0].message["content"]

    # Update the page with the bot's response
    page.content = translate
    db.session.commit()

    return jsonify({"translate": translate})


@page_routes.route('/<int:id>/outline', methods=["POST"])
@login_required
def outline_page_by_page_id(id):
    """Route for suggesting names on a page by page id"""
    page = Page.query.get(id)
    data = request.get_json()

    if not page:
        return jsonify({"message": "Specified page does not exist"})

    content = data['content']

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": "You are a helpful assistant that will help the user create an outline of the main content points return only the react quill delta format."},
                {"role": "user", "content": f"I need help creating an outline based on this content: {content}"},

        ],
        temperature = 1,
        max_tokens = 1000,
        n = 1,
    )
    outline = completion.choices[0].message["content"]

    # Update the page with the bot's response
    page.content = outline
    db.session.commit()

    return jsonify({"outline": outline})

@page_routes.route('/<int:id>/analyze', methods=["POST"])
@login_required
def analyze_page_by_page_id(id):
    """Route for suggesting names on a page by page id"""
    page = Page.query.get(id)
    data = request.get_json()

    if not page:
        return jsonify({"message": "Specified page does not exist"})

    content = data['content']

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": "You are a helpful assistant that will analyze the users content and give helpful suggestions to improve it"},
                {"role": "user", "content": f"I need help with a review of my content and would love an analysis on how it can be improved: {content}"},

        ],
        temperature = 1,
        max_tokens = 1000,
        n = 1,
    )
    analyze = completion.choices[0].message["content"]

    # Update the page with the bot's response
    page.content = analyze
    db.session.commit()

    return jsonify({"analyze": analyze})

@page_routes.route('/<int:id>/smart', methods=["POST"])
@login_required
def smart_page_by_page_id(id):
    """Route for suggesting names on a page by page id"""
    page = Page.query.get(id)
    data = request.get_json()

    if not page:
        return jsonify({"message": "Specified page does not exist"})

    content = data['content']

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": "You are a helpful assistant that will analyze the users content and make them sound smarter"},
                {"role": "user", "content": f"I need help sounding smarter with my content: {content}"},

        ],
        temperature = 1,
        max_tokens = 1000,
        n = 1,
    )
    smart = completion.choices[0].message["content"]

    # Update the page with the bot's response
    page.content = smart
    db.session.commit()

    return jsonify({"smart": smart})

@page_routes.route('/<int:id>/blog', methods=["POST"])
@login_required
def blog_page_by_page_id(id):
    """Route for suggesting names on a page by page id"""
    page = Page.query.get(id)
    data = request.get_json()

    if not page:
        return jsonify({"message": "Specified page does not exist"})

    content = data['content']
    topic = data['topic']

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": "You are a helpful assistant that will help create a blog entry for the user based on the topic"},
                {"role": "user", "content": f"Can you help me create a blog based on this: {topic}"},

        ],
        temperature = 1,
        max_tokens = 1000,
        n = 1,
    )
    blog = completion.choices[0].message["content"]

    # Update the page with the bot's response
    page.content = blog
    db.session.commit()

    return jsonify({"blog": blog})

@page_routes.route('/<int:id>/humble', methods=["POST"])
@login_required
def humble_page_by_page_id(id):
    """Route for suggesting names on a page by page id"""
    page = Page.query.get(id)
    data = request.get_json()

    if not page:
        return jsonify({"message": "Specified page does not exist"})

    content = data['content']

    completion = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[
                {"role": "system", "content": "You are a helpful assistant that will help the user create a more humble message based on his content"},
                {"role": "user", "content": f"I need my content to sound more humble: {content}"},

        ],
        temperature = 1,
        max_tokens = 1000,
        n = 1,
    )
    humble = completion.choices[0].message["content"]

    # Update the page with the bot's response
    page.content = humble
    db.session.commit()

    return jsonify({"humble": humble})


@page_routes.route('/', methods=["POST"])
@login_required
def create_a_page_by_workspace_id():
    """Route for creating a page by workspace by id"""
    res = request.get_json()

    workspace = Workspace.query.filter_by(id=res['workspace_id'], user_id=current_user.id).first()

    if not workspace:
        return jsonify({"message": "Specified workspace does not exist"})
    
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

    # Use the provided content if it exists, otherwise use the starter_content
    content = res.get('content', starter_content)

    new_page = Page(
        workspace_id=res['workspace_id'],
        name=res['name'],
        content=content
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

