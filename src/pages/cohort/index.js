import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentCohortTeachersList from '../../components/StudentCohortTeachersList';
import CohortStudentListForTeacher from '../../components/CohortStudentListForTeacher';
import MyCohortCard from '../../components/myCohortPage';
import MyExercises from '../../components/MyExercises';
import Card from '../../components/card';
import './style.css';
import { myCohortCourseContext } from '../../context/myCohortCourseContext';
import { userContext } from '../../context/userContext';

const CohortPage = () => {
  const { user } = useContext(userContext);
  const { cohort } = useContext(myCohortCourseContext);
  const navigate = useNavigate();

  const storedToken = localStorage.getItem('token');
  if (!storedToken) {
    navigate('/login');
    return null;
  }

  if (user === null) { return "loading user" };
  if (cohort === null) { return "loading cohort" };
  const userRole = user.role;
  const userId = user.id;
  const cohortId = cohort.cohortId;

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
        </main>
      )}
    </>
  );
};

export default CohortPage;
