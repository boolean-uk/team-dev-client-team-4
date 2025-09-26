import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { API_URL } from '../../service/constants';
import StudentCohortTeachersList from '../../components/StudentCohortTeachersList';
import CohortStudentListForTeacher from '../../components/CohortStudentListForTeacher';
import StudentInfoForTeacher from '../../components/StudentInfoForTeacher';
import MyCohortCard from '../../components/myCohortPage';
import MyExercises from '../../components/MyExercises';
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
            <MyCohortCard />
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
          <MyExercises />
        </Card>
      </aside>
      )}

      {userRole === 'Teacher' && (
        <main className="cohort-teacher-main">
          <CohortStudentListForTeacher userId={userId} />
          <StudentInfoForTeacher />
        </main>
      )}
    </>
  );
};

export default CohortPage;
