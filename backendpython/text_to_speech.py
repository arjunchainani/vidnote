from flask import Flask, request, render_template, redirect, flash
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import json
import jwt

app = Flask(__name__)
app.secret_key = 'your_secret_key'

# MongoDB connection
client = MongoClient('mongodb+srv://T:Taptaplit10@cluster0.wvq5zof.mongodb.net/?retryWrites=true&w=majority')
db = client['your_database']
users_collection = db['users']
notes_collection = db['notes']

@app.route('/')
def home():
    return "Hello World!"

@app.route('/convert', methods=['POST'])
def convert_to_speech():
    video_url = request.get_json()["video_url"]
    # add processing code if you need

    response_data = {'message': 'Video URL received', 'video_url': video_url}
    response = app.response_class(
        response=json.dumps(response_data),
        status=200,
        mimetype='application/json'
    )
    return response

@app.route('/play') 
def play_video():
    youtube_url = request.args.get('url')
    if youtube_url:
        return render_template('play_video.html', youtube_url=youtube_url)
    return "Invalid YouTube URL"

@app.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        existing_user = users_collection.find_one({'username': username})
        if existing_user:
            response_data = {'message': 'Username Already Exists', 'ok': False}
            response = app.response_class(
                response=json.dumps(response_data),
                status=200,
                mimetype='application/json'
            )
            return response

        hashed_password = generate_password_hash(password)

        new_user = {'username': username, 'password': hashed_password}
        users_collection.insert_one(new_user)
        response_data = {'message': 'Registration Successful', 'ok': True}
        response = app.response_class(
            response=json.dumps(response_data),
            status=200,
            mimetype='application/json'
        )
        return response

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']

        user = users_collection.find_one({'username': username})
        if user and check_password_hash(user['password'], password):
            user_token = jwt.encode({"id": user._id})
            response_data = {'message': user_token, 'ok': True}
            response = app.response_class(
                response=json.dumps(response_data),
                status=200,
                mimetype='application/json'
            )
            return response
        else:
            response_data = {'message': "Invalid Username or Password", 'ok': False}
            response = app.response_class(
                response=json.dumps(response_data),
                status=200,
                mimetype='application/json'
            )
            return response


@app.route('/get/notes')
def getNotes():
    return "Welcome to the dashboard!"

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)
