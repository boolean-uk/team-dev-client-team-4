import React, { useState, useEffect } from 'react';
import Card from '../card';
import ProfileCircle from '../profileCircle';
import { API_URL } from '../../service/constants';
import './style.css';
import { PiDotsThree } from 'react-icons/pi';
import SearchResults from '../searchResults';
import mapCourseToIcon from '../../userUtils/mapCourseIcon';
import mapIconBackgroundColor from '../../userUtils/mapIconBackgroundColor';
import { useLocation } from 'react-router-dom';

const CohortStudentListForTeacher = ({ userId }) => {
  const [cohortCourses, setCohortCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCohortCourseId, setSelectedCohortCourseId] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const initialSelectedCourseId = location.state?.initialSelectedCourseId;

  useEffect(() => {
    const fetchCohortCourses = async () => {
      try {
        const response = await fetch(`${API_URL}/cohortcourses`);
        const data = await response.json();

        const sortedData = data.sort((a, b) => {
          const courseNameComparison = a.courseName.localeCompare(b.courseName);
          if (courseNameComparison !== 0) {
            return courseNameComparison;
          }
          return new Date(a.startDate) - new Date(b.startDate);
        });

        setCohortCourses(sortedData);

        const selectedId = initialSelectedCourseId || (sortedData.length > 0 ? sortedData[0].id : null);
        setSelectedCohortCourseId(selectedId);

        const selectedCourse = sortedData.find(cc => cc.id === selectedId);
        if (selectedCourse?.users) {
          const studentList = selectedCourse.users.filter(user => user.role === 'Student');
          setStudents(studentList);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching cohort courses:', error);
        setCohortCourses([]);
        setLoading(false);
      }
    };

    fetchCohortCourses();
  }, []);

  const handleCohortSelect = (cohortCourseId) => {
    setSelectedCohortCourseId(cohortCourseId);

    const selectedCohortCourse = cohortCourses.find(cc => cc.id === cohortCourseId);
    if (selectedCohortCourse && selectedCohortCourse.users) {
      const studentList = selectedCohortCourse.users.filter(user => user.role === 'Student');
      setStudents(studentList);
    } else {
      setStudents([]);
    }
  };

  return (
    <Card>
      <div className="cohort-teacher-layout">
        <div className="cohort-list-section">
          <h4>Cohorts</h4>
          <hr />
          <div className="course-button-row">
            <button
              className="cohort-button"
              onClick={() => {}}
            >
              Add cohort
            </button>
            <PiDotsThree className="dots-icon" />
          </div>
            <hr />
          {loading
            ? (
              <p>Loading cohorts...</p>
              )
            : (
              <ul className="course-list">
                {cohortCourses.map((cohortCourse) => (
                  <li key={cohortCourse.id} className="course-item">
                    <div
                      className={`cohort-card ${selectedCohortCourseId === cohortCourse.id ? 'active' : ''}`}
                      onClick={() => handleCohortSelect(cohortCourse.id)}
                    >
                      <div
                        className="course-icon"
                        style={mapIconBackgroundColor(cohortCourse.courseName)}
                      >
                        {mapCourseToIcon(cohortCourse.courseName)}
                      </div>
                      <div className="cohort-info">
                        <div className="cohort-name">{cohortCourse.courseName}</div>
                        <div className="cohort-subtitle">{cohortCourse.cohortName}</div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              )}
        </div>

        <div className="students-section">
          <div className="students-header">
            <h4>Students</h4>
            <SearchResults />
          </div>
          <hr />
          <div className="course-button-row">
            <div className="selected-course">
              {selectedCohortCourseId
                ? (() => {
                    const selected = cohortCourses.find(cc => cc.id === selectedCohortCourseId);
                    return selected
                      ? (
                      <div className="selected-course-content">
                        <div
                          className="course-icon"
                          style={mapIconBackgroundColor(selected.courseName)}
                        >
                          {mapCourseToIcon(selected.courseName)}
                        </div>
                        <div>
                          <strong>{selected?.courseName}, {selected?.cohortName}</strong>
                          <p className='cohort-dates'>{selected?.startDate} - {selected?.endDate}</p>
                        </div>
                      </div>
                        )
                      : 'Course not found';
                  })()
                : 'Select a cohort'
              }
            </div>
            <div className="button-group">
              <button className="cohort-button">
                Add student
              </button>
              <PiDotsThree className="dots-icon" />
            </div>
          </div>

          <hr />
          {students.length > 0
            ? (
              <div className="students-grid">
                {students
                  .filter(student => student.id !== Number(userId))
                  .map((student) => (
                    <div key={student.id} className="student-card">
                      <ProfileCircle
                        uniqueKey={`student-${student.id}`}
                        role="student"
                        initials={`${student.firstName?.[0] ?? ''}${student.lastName?.[0] ?? ''}`.toUpperCase()}
                        userId={student.id}
                        name={`${student.firstName} ${student.lastName}`}
                      />
                      <div className="student-info">
                        <div>{student.firstName} {student.lastName}</div>
                      </div>
                      <div className="edit-icon">
                        <PiDotsThree className='dots-icon' />
                      </div>
                    </div>
                  ))}
              </div>
              )
            : selectedCohortCourseId
              ? (
                <p>No students found in this cohort</p>
                )
              : (
                <p>Select a cohort to view students</p>
                )}
        </div>
      </div>
    </Card>
  );
};

export default CohortStudentListForTeacher;
