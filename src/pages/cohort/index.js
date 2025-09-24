import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { API_URL } from '../../service/constants';
import StudentCohortTeachersList from '../../components/StudentCohortTeachersList';
import Card from '../../components/card';
import './style.css';

const CohortPage = () => {
  const [cohortId, setCohortId] = useState(null);
  const [loadingCohort, setLoadingCohort] = useState(true);
  const navigate = useNavigate();

  const storedToken = localStorage.getItem('token');
  if (!storedToken) {
    navigate('/login');
    return null;
  }

  const decodedToken = jwtDecode(storedToken);
  const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
  const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

  useEffect(() => {
    setLoadingCohort(true);
    fetch(`${API_URL}/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCohortId(data.data.cohortId);
        setLoadingCohort(false);
      })
      .catch(() => {
        setCohortId(null);
        setLoadingCohort(false);
      });
  }, [userId]);

  return (
    <>
      {userRole === 'Student' && (
        <main>
          <Card>
            <h3>My Cohort</h3>
            <hr />
            <p>User ID: {userId}</p>
            <p>User Role: {userRole}</p>
            <p>Cohort ID: {loadingCohort ? 'Loading...' : cohortId}</p>
          </Card>
        </main>
      )}

      {userRole === 'Student' && (
      <aside>
        <Card>
          <h4>Teachers</h4>
          <hr />
          <StudentCohortTeachersList cohortId={cohortId} userId={userId} />
        </Card>

        <Card>
          <h4>My Exercises</h4>
          <hr />
          <p>Add component here</p>
        </Card>
      </aside>
      )}
    </>
  );
};

export default CohortPage;
