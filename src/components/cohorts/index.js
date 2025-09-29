import { useEffect, useState } from 'react';
import './style.css';
import { API_URL } from '../../service/constants';
import mapCourseToIcon from '../../userUtils/mapCourseIcon';
import mapIconBackgroundColor from '../../userUtils/mapIconBackgroundColor';
import { useNavigate } from 'react-router-dom';

const Cohorts = () => {
  const [cohortCourses, setCohortCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCohortCourses = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/cohortcourses`);
        const data = await res.json();
        console.log('Fetched cohort courses:', data);
        setCohortCourses(data);
      } catch (err) {
        console.error('Failed to fetch cohort courses:', err);
        setCohortCourses([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCohortCourses();
  }, []);

  const navToChortPage = (cohortCourseId) => {
    console.log('Navigating with cohortCourseId:', cohortCourseId);
    navigate('/cohort', {
      state: {
        initialSelectedCourseId: cohortCourseId
      }
    });
  };

  return (
    <>
    <h4>Cohorts</h4>
    <hr />
    <ul className={`cohort-course-list ${cohortCourses.length >= 4 ? 'scrollable' : ''}`}>
        {loading && <li>Loading...</li>}
        {!loading && cohortCourses.length === 0 && <li>No cohort courses found</li>}
        {!loading &&
            cohortCourses.map((cohortcourse) => {
              return (
                    <li key={cohortcourse.id} className="cohort-course-item" onClick={() => navToChortPage(cohortcourse.id)}>
                        <div className="profile-icon" style={mapIconBackgroundColor(cohortcourse.courseName)}>
                            {mapCourseToIcon(cohortcourse.courseName)}
                        </div>
                          <div className="course-name">
                          <strong>
                            {cohortcourse.courseName}
                          </strong>
                          <div className="cohort-id">
                            Cohort {cohortcourse.cohortId}
                          </div>
                      </div>
                  </li>
              );
            })}
    </ul>
    </>
  );
}

export default Cohorts;
