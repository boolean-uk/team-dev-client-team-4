import React, { useEffect, useState } from 'react';
import ProfileCircle from '../profileCircle';
import './index.css';
import { API_URL } from '../../service/constants';

const TeacherUserlist = ({ role, userId }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (role === 'Teacher') {
      fetch(`${API_URL}/users`)
        .then((res) => res.json())
        .then((data) => {
          const studentsOnly = data.data.users.filter((user) => user.role === 'Student');
          setStudents(studentsOnly);
          setLoading(false);
        })
        .catch(() => {
          setStudents([]);
          setLoading(false);
        });
    } else {
      setStudents([]);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <h4>Students</h4>
      <hr />
      <ul className="student-list">
        {loading && <li>Loading...</li>}
        {!loading &&
          students
            .filter((user) => user.id !== Number(userId))
            .map((user) => (
              <li key={user.id} className="user-list-item">
                <ProfileCircle
                  initials={`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()}
                />
                <div className="user-info">
                  <strong>
                    {user?.firstName} {user?.lastName}
                  </strong>
                  <div className="user-specialism">
                    {mapSpecialism(user?.specialism) || 'No specialism'}
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </>
  );
};

function mapSpecialism(specialism) {
  if (specialism === 0) {
    return 'Frontend';
  }
  if (specialism === 1) {
    return 'Backend';
  }
  if (specialism === 2) {
    return 'Fullstack';
  }
  return undefined;
}

export default TeacherUserlist;
