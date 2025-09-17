import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import { useEffect, useState, useContext } from 'react';
import ProfileCircle from '../profileCircle';
import './index.css';
import { API_URL } from '../../service/constants';
import { CascadingMenuContext } from '../../context/cascadingMenuContext';

const TeacherUserlist = ({ title, role, userId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { cascadingMenuVisibleId, setCascadingMenuVisibleId } = useContext(CascadingMenuContext);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_URL}/users`)
      .then((res) => res.json())
      .then((data) => {
        const filteredUsers = data.data.users.filter((user) => user.role === role);
        setUsers(filteredUsers);
        setLoading(false);
      })
      .catch(() => {
        setUsers([]);
        setLoading(false);
      });
  }, [role]);

  const handleClick = () => {
    navigate('/search');
  };

  return (
    <>
      <h4>{title}</h4>
      <hr />
      <ul className="student-list">
        {loading && <li>Loading...</li>}
        {!loading &&
          users
            .filter((user) => user.id !== Number(userId))
            .slice(0, 10)
            .map((user) => (
              <li key={user.id} className="user-list-item">
                <ProfileCircle
                  cascadingMenuVisibleId={cascadingMenuVisibleId}
                  setCascadingMenuVisibleId={setCascadingMenuVisibleId}
                  id={'student' + user.id}
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
      {users.length > 10 && (
        <>
          <hr />
          <Button text={`All ${title.toLowerCase()}`} onClick={handleClick} classes="button offwhite" />
        </>
      )}
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
