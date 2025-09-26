/* eslint-disable */

import { useState, useEffect } from 'react';
import useModal from '../../../hooks/useModal';
import './style.css';
import Button from '../../button';
import useAuth from '../../../hooks/useAuth';
import useDialog from '../../../hooks/useDialog';
import { API_URL } from '../../../service/constants';
import ProfileCircle from '../../profileCircle';

const CreateCohortCourseModal_step2 = ({ createCC_data, closeModal }) => {

  const { loggedInUser } = useAuth();
  const { showActionSuccessPopup } = useDialog();
  const { token } = useAuth();

  const [studentList, setStudentList] = useState([]);
  const [filteredStudentList, setFilteredStudentList] = useState([]);
  const [selectedStudentList, setSelectedStudentList] = useState([]);
  const [courseList, setCourseList] = useState([]);
  const [cohortList, setCohortList] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedCohort, setSelectedCohort] = useState('');
  const [selectedCohortObj, setSelectedCohortObj] = useState();

  useEffect(() => {
    fetch(`${API_URL}/users`)
          .then((res) => res.json())
          .then((data) => {
            setStudentList(data.data.users?.filter(u => u.role === 'Student'));
          })
          .catch(() => { setStudentList([]); });
  }, []);

  useEffect(() => {
    setFilteredStudentList(studentList.filter(student =>
      !selectedStudentList.includes(student.id.toString())
    ));
  }, [selectedStudentList, studentList]);

  const postCohortCourse = async ({ cohortId, courseId }) => {
  try {
    const response = await fetch(`${API_URL}/cohortcourses/cohortCourse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        cohortId,
        courseId
      }),
    });
    if (response.status !== 200) {
      throw new Error('Failed to create cohort course');
    }
    const data = await response.json();
    console.log('Created cohort course:', data);
    
    showActionSuccessPopup('Cohort course created successfully!');
    return data;
  } catch (error) {
    
    alert(error);
    return null;
  }
};



  return (
        <>
            <section className="create-cohort-course-header">
                <h2>Add Cohort</h2>
                <p>Add students to cohort</p>
            </section>
            <hr />

            {/* Student Dropdown */}
      <section>
        <div className="cohortCourse-info-label">
          <h3>Cohort details</h3>
          <hr />
          <p>{createCC_data.cohortName}, {createCC_data.courseName}</p>
          <p>{createCC_data.startDate} - {createCC_data.endDate}</p>
   
        </div>

      </section>
      <hr/>
      <section>
        <label htmlFor="student-select">Student:</label>
        <select
          id="student-select"
          value={"Students"}
          onChange={e => setSelectedStudentList([...selectedStudentList, e.target.value])}
        >
          <option value="" className='options-menu'>Students</option>
          {filteredStudentList.map(student => (
            <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>
          ))}
        
        </select>
        <div className="selected-students-container">

          {selectedStudentList.map(studentId => {
            const student = studentList.find(s => s.id.toString() === studentId);
            return (
              <div key={student.id} className="student-card">
                      <ProfileCircle
                        uniqueKey={`student-${student.id}`}
                        role="student"
                        initials={`${student.firstName?.[0] ?? ''}${student.lastName?.[0] ?? ''}`.toUpperCase()}
                        userId={student.id}
                      />
                      <div className="student-info">
                        <div>{student.firstName} {student.lastName}</div>
                      </div>
                    </div>
            );
          })}
        </div>
      </section>
                    
    



      <section className="create-cohort-course-actions">
          <Button
            text="Cancel"
            onClick={closeModal}

          />

          <Button
          className="add-cohort-button"
            text="Add Cohort"
            onClick={() => {
              postCohortCourse({
                cohortId: createCC_data.cohortId,
                courseId: createCC_data.courseId
              });
              closeModal();
            }}
            />
      </section>
        </>
  );
};
export default CreateCohortCourseModal_step2;

