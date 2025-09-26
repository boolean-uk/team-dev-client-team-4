import React, { useContext, useEffect, useState } from 'react';
import ProfileCircle from '../profileCircle';
import { API_URL } from '../../service/constants';
import './style.css';
import { myCohortCourseContext } from '../../context/myCohortCourseContext';

const StudentCohortTeachers = ({ cohortId, userId }) => {
  const { cohort } = useContext(myCohortCourseContext);
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const teachersOnly = cohort.users.filter(user => user.role === 'Teacher');
    setTeachers(teachersOnly);
    setLoading(false);
  }, [cohort])
  if (cohort === null) { return "loading teachers" };

  return (
    <>
      <ul className="student-list">
        {loading && <li>Loading...</li>}
        {!loading && teachers.length === 0 && <li>No teachers found</li>}
        {!loading &&
          teachers.map((teacher, idx) => {
            const uid = teacher.id ?? teacher.userId ?? teacher.user_id ?? idx;
            return (
              <li key={uid} className="user-list-item">
                <ProfileCircle
                  uniqueKey={`teacher-${uid}`}
                  role="teacher"
                  initials={`${teacher?.firstName?.[0] ?? ''}${teacher?.lastName?.[0] ?? ''}`.toUpperCase()}
                  userId={uid}
                />
                <div className="user-info">
                  <strong>
                    {teacher?.firstName} {teacher?.lastName}
                  </strong>
                  <div className="user-specialism">
                    {teacher?.specialism || 'No specialism'}
                  </div>
                </div>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default StudentCohortTeachers;
