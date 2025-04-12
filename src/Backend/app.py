from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import random

app = Flask(__name__)
CORS(app)


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

with open('courses.json') as f:
    courses_data = json.load(f)

with open('testimonials.json') as f:
    testimonials_data = json.load(f)

# 1. Student Registration API
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')

    if any(s['username'] == username for s in students):
        return jsonify({'status': 'error', 'message': 'Username is already taken'}), 400

    student_id = len(students) + 1
    new_student = {
        'id': student_id,
        'username': username,
        'password': data.get('password'),
        'email': data.get('email'),
        'enrolled_courses': []
    }
    students.append(new_student)
    return jsonify({'status': 'success', 'message': 'Registration successful'}), 200

# 2. Login API
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    for student in students:
        if student['username'] == data.get('username') and student['password'] == data.get('password'):
            return jsonify({'status': 'success', 'student_id': student['id']}), 200
    return jsonify({'status': 'error', 'message': 'Invalid credentials'}), 401

# 3. Testimonials API
@app.route('/testimonials', methods=['GET'])
def get_testimonials():
    sample_testimonials = random.sample(testimonials_data, 2)
    return jsonify(sample_testimonials)

# 4. Enroll Courses API
@app.route('/enroll/<int:student_id>', methods=['POST'])
def enroll_course(student_id):
    data = request.get_json()
    course = data.get('course')


    # with open('courses.json', 'r') as f:
    #     all_courses = json.load(f)
    
    # course_obj = next(
    #     (c for c in all_courses if c['name'].strip().lower() == course['name'].strip().lower()),
    #     None
    # )
    # if not course_obj:
    #     return jsonify({'status': 'error', 'message': 'Course not found'}), 404

    for student in students:
        if student['id'] == student_id:
            if course not in student['enrolled_courses']:
                student['enrolled_courses'].append(course)
                return jsonify({'status': 'success', 'message': 'Course enrolled'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Already enrolled'}), 400

    return jsonify({'status': 'error', 'message': 'Student not found'}), 404

# 5. Delete Courses API
@app.route('/drop/<int:student_id>', methods=['DELETE'])
def drop_course(student_id):
    data = request.get_json()
    course = data.get('course')

    for student in students:
        if student['id'] == student_id:
            if course in student['enrolled_courses']:
                student['enrolled_courses'].remove(course)
                return jsonify({'status': 'success', 'message': 'Course dropped'}), 200
            else:
                return jsonify({'status': 'error', 'message': 'Course not enrolled'}), 400

    return jsonify({'status': 'error', 'message': 'Student not found'}), 404

# 6. Get All Courses API
@app.route('/courses', methods=['GET'])
def get_courses():
    return jsonify(courses_data)

# 7. Get Student Courses API
@app.route('/student_courses/<int:student_id>', methods=['GET'])
def get_student_courses(student_id):
    for student in students:
        if student['id'] == student_id:
            return jsonify(student['enrolled_courses'])
    return jsonify([])

if __name__ == '__main__':
    app.run(debug=True)
