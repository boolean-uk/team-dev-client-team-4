import { useEffect, useState } from 'react';
import './style.css';
import { API_URL } from '../../service/constants';
import BicodeIcon from '../../assets/icons/bicodeIcon';
import ProfileIcon from '../../assets/icons/profileIcon';

const Cohorts = () => {
  const [cohorts, setCohorts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/cohorts`)
      .then((res) => res.json())
      .then((data) => {
        const list = data?.data ?? [];
        setCohorts(list);
        setLoading(false);
      })
      .catch(() => {
        setCohorts([]);
        setLoading(false);
      });
  }, []);

  return (
    <>
    <h4>Cohorts</h4>
    <hr />
    <ul className="cohorts-list">
        {loading && <li>Loading...</li>}
        {!loading && cohorts.length === 0 && <li>No cohorts found</li>}
        {!loading &&
            cohorts.map((cohort) => {
              return (
                    <li key={cohort.id} className="cohorts-list-item">
                        <div className="profile-icon" style={{ background: '#05f569ff' }}>
                            <BicodeIcon />
                        </div>
                    </li>
              );
            })}
    </ul>
    </>
);
}

export default Cohorts;
