from flask import Flask, jsonify
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)

with open('courses.json', 'r') as f:
    courses = json.load(f)

with open('testimonials.json', 'r') as f:
    testimonials = json.load(f)

with open('students.json', 'r') as f:
    students = json.load(f)


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