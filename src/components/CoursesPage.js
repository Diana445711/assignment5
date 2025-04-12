import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import CourseItem from './CourseItem';
import EnrollmentList from './EnrollmentList';
import courses from '../Backend/courses';

const CoursesPage = () => {
  
  const [enrolledCourses, setEnrolledCourses] = useState([]);



  const [studentId, setStudentId] = useState(localStorage.getItem('studentId'));

  useEffect(() => {
    const id = localStorage.getItem('studentId');
    setStudentId(id);
  }, []);

  useEffect(() => {
    if (studentId) {
      fetch(`http://127.0.0.1:5000/student_courses/${studentId}`)
        .then(res => res.json())
        .then(data => setEnrolledCourses(data))
        .catch(err => {
          console.error('Failed to fetch enrollments:', err);
          setEnrolledCourses([]); 
        });
    }
  }, [studentId]);

  const handleEnroll = async (course) => {
    try {
      const response = await fetch(`http://127.0.0.1:5000/enroll/${studentId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({course})
      });
  
      const result = await response.json();
  
      if (response.ok) {
        const res = await fetch(`http://127.0.0.1:5000/student_courses/${studentId}`);
        const updated = await res.json();
        setEnrolledCourses(updated);
      } else {
        alert(result.message || 'Enrollment failed.');
      }
    } catch (err) {
      console.error('Failed to enroll:', err);
      alert('Failed to connect to the server.');
    }
  };
  

  const handleRemove = (enrollmentId) => {
    fetch(`http://127.0.0.1:5000/drop/${studentId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ enrollment_id: enrollmentId })
    })
      .then(res => res.json())
      .then(() => {
        
        return fetch(`http://127.0.0.1:5000/student_courses/${studentId}`)
          .then(res => res.json())
          .then(data => setEnrolledCourses(data));
      });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column' 
    }}>
      <Header />
      
      <div style={{ 
        flex: 1,
        display: 'flex',
        padding: '20px',
        gap: '30px'
      }}>
        <div style={{ flex: 3 }}>
          <h2 style={{ color: '#004080' }}>Available Courses</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
          }}>
            {courses.map(course => (
              <CourseItem 
                key={course.id} 
                course={course} 
                onEnroll={handleEnroll}
              />
            ))}
          </div>
        </div>
        
        <EnrollmentList 
          enrolledCourses={enrolledCourses}
          onRemove={handleRemove}
        />
      </div>

      <Footer />
    </div>
  );
};

export default CoursesPage;
