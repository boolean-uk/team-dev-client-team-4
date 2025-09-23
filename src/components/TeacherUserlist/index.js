import { useNavigate } from 'react-router-dom';
import Button from '../../components/button';
import { useEffect, useState, useContext } from 'react';
import ProfileCircle from '../profileCircle';
import './index.css';
import { API_URL } from '../../service/constants';
import { CascadingMenuContext } from '../../context/cascadingMenuContext';
import mapSpecialism from '../../userUtils/mapSpecialism';
import { get } from '../../service/apiClient';

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

  const fetchUser = async (userId) => {
    try {
      const updatedUser = await get(`users/${userId}`).then(res => res.data.user || res.data);

      setUsers(prevUsers =>
        prevUsers.map(user =>
          user.id === userId ? updatedUser : user
        )
      );
    } catch (err) {
      console.error('Failed to fetch user:', err);
    }
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
                  uniqueKey={'student' + user.id}
                  role={user.role.toLowerCase()}
                  initials={`${user?.firstName?.[0] ?? ''}${user?.lastName?.[0] ?? ''}`.toUpperCase()}
                  userId={user.id}
                  name ={`${user?.firstName ?? ''} ${user?.lastName ?? ''}`}
                  user={user}
                  onUserUpdate={fetchUser}
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
          <Button
            text={`All ${title.toLowerCase()}`}
            onClick={handleClick}
            classes="button offwhite"
          />
        </>
      )}
    </>
  );
};

export default TeacherUserlist;
