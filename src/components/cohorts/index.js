import { useEffect, useState } from 'react';
import './style.css';
import { API_URL } from '../../service/constants';
import BicodeIcon from '../../assets/icons/bicodeIcon';

const Cohorts = () => {
  const [cohortCourses, setCohortCourses] = useState([]);
  const [loading, setLoading] = useState(true);

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
                    <li key={cohortcourse.id} className="cohort-course-item">
                        <div className="profile-icon" style={{ background: '#1dc262ff' }}>
                            <BicodeIcon />
                        </div>
                          <div className="cohort-info">
                          <strong>
                            Cohort {cohortcourse.cohortId}
                          </strong>
                          <div className="course-name">
                            {cohortcourse.courseName}
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
