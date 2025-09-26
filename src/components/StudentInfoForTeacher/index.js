import React, { useState, useEffect } from 'react';
import Card from '../card';
import SearchResults from '../searchResults';
import { PiCaretDownFill } from "react-icons/pi";
import { API_URL } from '../../service/constants';
import mapCourseToIcon from '../../userUtils/mapCourseIcon';
import NotesList from '../notesList';
import './style.css';

const StudentInfoForTeacher = () => {
  const [cohortCourses, setCohortCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedCohort, setSelectedCohort] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCohortCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/cohortcourses`);
        const data = await response.json();
        console.log('CohortCourses data:', data);
        setCohortCourses(Array.isArray(data) ? data : data.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cohort courses:', error);
        setCohortCourses([]);
        setLoading(false);
      }
    };

    fetchCohortCourses();
  }, []);

  // Get unique course names
  const uniqueCourses = [...new Set(cohortCourses.map(cc => cc.courseName))];

  // Get cohorts for selected course
  const availableCohorts = selectedCourse 
    ? cohortCourses.filter(cc => cc.courseName === selectedCourse)
    : [];

  // Get students for selected cohort
  const availableStudents = selectedCohort 
    ? (() => {
        const selectedCohortCourse = cohortCourses.find(cc => cc.id === parseInt(selectedCohort));
        return selectedCohortCourse && selectedCohortCourse.users 
          ? selectedCohortCourse.users.filter(user => user && user.role === 'Student')
          : [];
      })()
    : [];

  // Get the selected student object
  const selectedStudentObject = selectedStudent && availableStudents.length > 0 
    ? availableStudents.find(student => student && student.id === parseInt(selectedStudent))
    : null;

  const handleCourseChange = (e) => {
    setSelectedCourse(e.target.value);
    setSelectedCohort('');
    setSelectedStudent('');
  };

  const handleCohortChange = (e) => {
    setSelectedCohort(e.target.value);
    setSelectedStudent('');
  };

  return (
    <Card>
      <div className="student-info-container">
        <div className="student-info-header">
          <h3>Student info</h3>
          <SearchResults />
        </div>
        <hr />
        
        <div className="dropdown-container">
          <div className="dropdown-wrapper">
            <label className="dropdown-label">Course</label>
            <select 
              className="student-dropdown"
              value={selectedCourse}
              onChange={handleCourseChange}
            >
              <option value="">Select Course</option>
              {uniqueCourses.map((courseName) => (
                <option key={courseName} value={courseName}>
                  {courseName}
                </option>
              ))}
            </select>
            <PiCaretDownFill className="dropdown-icon" />
          </div>
          
          <div className="dropdown-wrapper">
            <label className="dropdown-label">Cohort</label>
            <select 
              className="student-dropdown"
              value={selectedCohort}
              onChange={handleCohortChange}
              disabled={!selectedCourse}
            >
              <option value="">Select Cohort</option>
              {availableCohorts.map((cohortCourse) => (
                <option key={cohortCourse.id} value={cohortCourse.id}>
                  {cohortCourse.cohortName}
                </option>
              ))}
            </select>
            <PiCaretDownFill className="dropdown-icon" />
          </div>

          <div className="dropdown-wrapper">
            <label className="dropdown-label">Student</label>
            <select 
              className="student-dropdown"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              disabled={!selectedCohort}
            >
              <option value="">Select Student</option>
              {availableStudents.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.firstName} {student.lastName}
                </option>
              ))}
            </select>
            <PiCaretDownFill className="dropdown-icon" />
          </div>
        </div>
        <br />
        <br />
        <hr />
        
        <div className="content-layout">
          <div className="left-content">
            <h4>Cohort Exercises</h4>
          </div>
          
          <div className="right-content">
            {selectedStudent ? (
              <NotesList 
                key={selectedStudent}
                userId={parseInt(selectedStudent)}
                user={selectedStudentObject}
              />
            ) : (
              <div>
                <h4>Student Notes</h4>
                <p>Select a student to view their notes</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default StudentInfoForTeacher;
