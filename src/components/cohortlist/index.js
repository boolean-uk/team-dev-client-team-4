import React, { useEffect, useState } from 'react';
import ProfileCircle from '../profileCircle';
import { PiDotsThree } from 'react-icons/pi';
import './style.css';
import { cohort } from '../../service/mockData';
import { API_URL } from '../../service/constants';

const CohortList = ({ cohortId, userId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (cohortId) {
  fetch(`${API_URL}/users/by_cohort/${cohortId}`)
        .then((res) => res.json())
        .then((data) => {
          setUsers(data.data.users);
          console.log(data);

          setLoading(false);
        })
        .catch(() => {
          setUsers([]);
          setLoading(false);
        });
    } else {
      setUsers([]);
      setLoading(false);
    }
  }, [cohortId]);

  let description;
  if (loading) {
    description = 'Loading...';
  } else if (cohortId && users.length > 0) {
    description = cohort.name;
  } else {
    description = 'You have not been assigned to a cohort yet';
  }

  return (
    <>
      <h4>My Cohort</h4>
      <p className="cohort-list-description">{description}</p>
      <hr />
      <ul className="cohort-list">
        {loading && <li>Loading...</li>}
        {!loading && users.length === 0 && <li>No users found</li>}
        {!loading &&
          users
            .filter((user) => user.id !== Number(userId))
            .map((user) => (
              <li key={user.id} className="cohort-list-item">
                <div style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <ProfileCircle
                    initials={`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()}
                    userId={user.id}
                    role={user.role}
                    uniqueKey={'cohortlist' + user.id}
                  />
                  <strong style={{ marginLeft: '8px' }}>
                    {user?.firstName} {user?.lastName}
                  </strong>
                  <div className="dots-icon">
                    <PiDotsThree />
                  </div>
                </div>
              </li>
            ))}
      </ul>
    </>
  );
};

export default CohortList;
