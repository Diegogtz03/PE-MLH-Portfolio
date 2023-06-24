import os
from flask import Flask, render_template, request
from dotenv import load_dotenv

load_dotenv()
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/welcome')
def welcome():
    return render_template('welcome.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/travel')
def travel():
    return render_template('travel.html', token = os.environ.get('MAPBOX_TOKEN'))

@app.route('/projects')
def projects():
    return render_template('projects.html')

@app.route('/experience')
def experience():
    experiences = [
        {
            "company_institution": "University of Lorem Ipsum",
            "start_date": "May 2021",
            "end_date": "May 2026",
        },
        {
            "company_institution": "MLH PE Fellowship",
            "start_date": "Jun 2023",
            "end_date": "Sep 2023",
        }
    ]
    return render_template('experience.html', experiences = experiences)

@app.route('/hobbies')
def hobbies():
    hobbies_1 = [
        {
            "name": "Hiking",
            "image": "../static/img/logo.jpg"
        },
        {
            "name": "Camping",
            "image": "../static/img/logo.jpg"
        },
    ]
    hobbies_2 = [
        {
            "name": "Kayaking",
            "image": "../static/img/logo.jpg"
        },
        {
            "name": "Biking",
            "image": "../static/img/logo.jpg"
        }
    ]
    return render_template('hobbies.html', hobbies_1 = hobbies_1 , hobbies_2 = hobbies_2)