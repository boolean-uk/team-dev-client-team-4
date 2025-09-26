import React, { useEffect, useState } from 'react';
import ProfileCircle from '../profileCircle';
import { API_URL } from '../../service/constants';
import './style.css';

const StudentCohortTeachers = ({ cohortId, userId }) => {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (cohortId) {
      setLoading(true);
      fetch(`${API_URL}/users/by_cohort/${cohortId}`)
        .then((res) => res.json())
        .then((data) => {
          const teachersOnly = data.data.users.filter(user => user.role === 'Teacher');
          setTeachers(teachersOnly);
          setLoading(false);
        })
        .catch(() => {
          setTeachers([]);
          setLoading(false);
        });
    } else {
      setTeachers([]);
      setLoading(false);
    }
  }, [cohortId]);

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
                    {(teacher?.specialism) || 'No specialism'}
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
