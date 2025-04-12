from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

with open('courses.json', 'r') as f:
    courses = json.load(f)

with open('testimonials.json', 'r') as f:
    testimonials = json.load(f)

students = [{
      "id": 1,
      "username": "alice",
      "password": "password123",
      "email": "alice@example.com",
      "enrolled_courses": []
    },
    {
      "id": 2,
      "username": "bob",
      "password": "secure456",
      "email": "bob@example.com",
      "enrolled_courses": []
    },
    {
      "id": 3,
      "username": "charlie",
      "password": "qwerty789",
      "email": "charlie@example.com",
      "enrolled_courses": []
    },
    {
      "id": 4,
      "username": "diana",
      "password": "hunter2",
      "email": "diana@example.com",
      "enrolled_courses": []
    },
    {
      "id": 5,
      "username": "eve",
      "password": "passpass",
      "email": "eve@example.com",
      "enrolled_courses": []
    },
    {
      "id": 6,
      "username": "frank",
      "password": "letmein",
      "email": "frank@example.com",
      "enrolled_courses": []
    },
    {
      "id": 7,
      "username": "grace",
      "password": "trustno1",
      "email": "grace@example.com",
      "enrolled_courses": []
    },
    {
      "id": 8,
      "username": "heidi",
      "password": "admin123",
      "email": "heidi@example.com",
      "enrolled_courses": []
    },
    {
      "id": 9,
      "username": "ivan",
      "password": "welcome1",
      "email": "ivan@example.com",
      "enrolled_courses": []
    },
    {
      "id": 10,
      "username": "judy",
      "password": "password1",
      "email": "judy@example.com",
      "enrolled_courses": []
    }
]


@app.route('/')
def home():
    print("✅ Home route was hit")
    return jsonify(message="🎉 Flask server is working!")

@app.route('/api/courses')
def get_courses():
    print("✅ Courses route was hit")
    return jsonify(courses)

@app.route('/api/testimonials')
def get_testimonials():
    print("✅ Testimonials route was hit")
    return jsonify(testimonials)

@app.route('/api/students')
def get_students():
    print("✅ Students route was hit")
    return jsonify(students)

if __name__ == '__main__':
    app.run()