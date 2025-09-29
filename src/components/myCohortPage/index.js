import { useEffect, useState } from 'react'
import './style.css'
import ProfileCircle from '../profileCircle';
// eslint-disable-next-line quotes
import jwtDecode from "jwt-decode";
import { PiDotsThree } from 'react-icons/pi';

function MyCohortCard() {
  const storedToken = localStorage.getItem('token');
  const decodedToken = jwtDecode(storedToken);
  const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
  const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

  const [user, setUser] = useState();
  const [cohortId, setCohortId] = useState();
  const [specialism, setSpecialism] = useState();
  const [cohortInfo, setCohortInfo] = useState([]);
  const [cohortName, setCohortName] = useState();
  const [usersInCohort, setUsersInCohort] = useState([]);

  useEffect(() => {
    userId !== null && fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data.data)
        setCohortId(data.data.cohortId)
        setSpecialism(data.data.specialism)
      })
      .catch(() => setUser(null), setCohortId(null))
  }, [userId]);

  useEffect(() => {
    cohortId && fetch(`${process.env.REACT_APP_API_URL}/cohorts/${cohortId}`)
      .then((res) => res.json())
      .then((data) => {
        setCohortInfo(data.data)
        setCohortName(data.data.cohortName)
      })
      .catch(() => setCohortInfo(null))
  }, [cohortId]);

  useEffect(() => {
    cohortId !== null && fetch(`${process.env.REACT_APP_API_URL}/users/by_cohort/${cohortId}`)
      .then((res) => res.json())
      .then((data) => {
        setUsersInCohort(data.data.users)
      })
      .catch(() => setCohortId(null))
  }, [cohortId]);

  return (
    <>
        <div>
          {cohortName && <p>{(specialism)}, {cohortName}</p>}
        </div>
        <hr/>
        <ul className="users_list">
          {cohortId && usersInCohort.map((user) => (
              <li key={user.id} className="user-list-item">
              <ProfileCircle
                initials={`${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()}
                userId={user.id}
              />
              <div className="user-info">
                  {user.firstName} {user.lastName}
              </div>
              <div className="edit-icon">
                <PiDotsThree className="dots-icon" />
              </div>
            </li>
          ))}
        </ul>
    </>
  )
}

export default MyCohortCard
