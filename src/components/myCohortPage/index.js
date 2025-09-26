import { useContext } from 'react'
import './style.css'
import ProfileCircle from '../profileCircle';
import SquareBracketsIcon from '../../assets/icons/squareBracketsIcon';
import { myCohortCourseContext } from '../../context/myCohortCourseContext';
import { userContext } from '../../context/userContext';

function MyCohortCard() {
  const { user } = useContext(userContext);
  const { cohort } = useContext(myCohortCourseContext)

  if (user === null) { return "loading user" };
  if (cohort === null) { return "loading cohort" };

  const cohortName = cohort.cohortName;
  const specialism = cohort.courseName;
  const startDate = cohort.startDate;
  const endDate = cohort.endDate;
  const usersInCohort = cohort.users;

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);

    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${year}`;
  };
  return (
    <>
        <div className='cohort-info'>
          <div className="cohort-icon" style={{ backgroundColor: "#28C846", alignContent: "center" }}>
            <SquareBracketsIcon />
          </div>
          <div className='cohort-text'>
            <h4>{specialism}, {cohortName}</h4>
            <p>{formatDateTime(startDate)} - {formatDateTime(endDate)}</p>
          </div>
        </div>
        <hr/>
        <ul className="users_list">
          {usersInCohort
            .filter(user => user.role === "Student")
            .map((user) => (
            <li key={user.id} className="user-list-item">
              <ProfileCircle
                initials={`${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()}
                userId={user.id}
              />
              <div className="user-info">
                  {user.firstName} {user.lastName}
              </div>
              <div className="edit-icon">
                <p>...</p>
              </div>
            </li>
            ))}
        </ul>
    </>
  )
}

export default MyCohortCard
