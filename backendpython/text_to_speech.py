from flask import Flask, request, render_template, redirect, flash
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
import json
import jwt
from flask_cors import CORS, cross_origin
from pytube import YouTube 
from datetime import datetime
from translation import convert_video_to_text
from model import ConciseSummarizerModel

SAVE_PATH = "C:\\Users\\home\\OneDrive\\Desktop\\Coding\\Hackathons\\JPS-HACKS-Notes-App\\backendpython\\videos"
app = Flask(__name__)
app.secret_key = 'your_secret_key'

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

# MongoDB connection
client = MongoClient('mongodb+srv://T:Taptaplit10@cluster0.wvq5zof.mongodb.net/?retryWrites=true&w=majority')
db = client['your_database']
users_collection = db['users']
notes_collection = db['notes']

@app.route('/')
@cross_origin()
def home():
    return "Hello World!"

@app.route('/transcribe', methods=['POST'])
def convert_to_speech():
    try:
        video_url = request.get_json()["video_url"]
        # add processing code if you need
        yt = YouTube(video_url)
        yt.streams.filter(file_extension='mp4', res="720p").first().download(SAVE_PATH)
        text = convert_video_to_text(yt.streams[0].title)
        
        # Passing transcription into model
        model = ConciseSummarizerModel()
        tokenized = model.summarize(text).to(model.device)
        summary = model.untokenize(tokenized)
        formatted_summary = model.format(summary)        

        response_data = {'message': formatted_summary, 'ok': True}
        response = app.response_class(
            response=json.dumps(response_data),
            status=200,
            mimetype='application/json'
        )
        return response
    except Exception as e: 
        response_data = {'message': e, 'ok': False}
        response = app.response_class(
            response=json.dumps(response_data),
            status=200,
            mimetype='application/json'
        )
        return response
# @app.route('/play') 
# def play_video():
#     youtube_url = request.args.get('url')
#     if youtube_url:
#         return render_template('play_video.html', youtube_url=youtube_url)
#     return "Invalid YouTube URL"

@app.route('/register', methods=['GET', 'POST'])
@cross_origin()
def register():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']
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
        response_data = {'message': 'Success', 'ok': True}
        response = app.response_class(
            response=json.dumps(response_data),
            status=200,
            mimetype='application/json'
        )
        return response

@app.route('/login', methods=['GET', 'POST'])
@cross_origin()
def login():
    if request.method == 'POST':
        username = request.json['username']
        password = request.json['password']

        user = users_collection.find_one({'username': username})
        if user and check_password_hash(user['password'], password):
            encoded_jwt = jwt.encode({"id": str(user["_id"])}, "secret", algorithm="HS256")
            response_data = {'message': encoded_jwt, 'ok': True}
            response = app.response_class(
                response=json.dumps(response_data),
                status=200,
                mimetype='application/json'
            )
            return response
        else:
            response_data = {'message': 'Invalid Username or Password', 'ok': False}
            response = app.response_class(
                response=json.dumps(response_data),
                status=200,
                mimetype='application/json'
            )
            return response

@app.route('/get/notes')
@cross_origin()
def get_notes():
    if (request.headers['jwt_token']):
        userInfo = jwt.decode(request.headers['jwt_token'], "secret", algorithms=["HS256"])
        if (not userInfo):
            response_data = {'message': 'Invalid Auth', 'ok': False}
            response = app.response_class(
                response=json.dumps(response_data),
                status=200,
                mimetype='application/json'
            )
            return response
        notes = notes_collection.find({'userID': userInfo.id})
        response_data = {'message': notes, 'ok': True}
        response = app.response_class(
            response=json.dumps(response_data),
            status=200,
            mimetype='application/json'
        )
        return response

@app.route('/create/note', methods=['POST'])
@cross_origin()
def create_notes():
    if (request.headers['jwt_token']):
        userInfo = jwt.decode(request.headers['jwt_token'], "secret", algorithms=["HS256"])
        if (not userInfo):
            response_data = {'message': 'Invalid Auth', 'ok': False}
            response = app.response_class(
                response=json.dumps(response_data),
                status=200,
                mimetype='application/json'
            )
            return response
        new_note = {'userID': userInfo.id, 'name': request.json['name'], 'note': request.json['note']}
        notes_collection.insert_one(new_note)
        response_data = {'message': "Success", 'ok': True}
        response = app.response_class(
            response=json.dumps(response_data),
            status=200,
            mimetype='application/json'
        )
        return response

@app.route('/delete/note', methods=['POST'])
@cross_origin()
def delete_notes():
    if (request.headers['jwt_token']):
        userInfo = jwt.decode(request.headers['jwt_token'], "secret", algorithms=["HS256"])
        if (not userInfo):
            response_data = {'message': 'Invalid Auth', 'ok': False}
            response = app.response_class(
                response=json.dumps(response_data),
                status=200,
                mimetype='application/json'
            )
            return response
        notes_collection.delete_one({"_id": request.json["note_id"]})
        response_data = {'message': "Success", 'ok': True}
        response = app.response_class(
            response=json.dumps(response_data),
            status=200,
            mimetype='application/json'
        )
        return response

if __name__ == '__main__':
    app.run(host="localhost", port=8000, debug=True)
