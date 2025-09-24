import { useState, useEffect } from 'react';
import Button from '../../components/button';
import Card from '../../components/card';
import CreatePostModal from '../../components/createPostModal';
import Posts from '../../components/posts';
import CohortList from '../../components/cohortlist';
import useModal from '../../hooks/useModal';
import './style.css';
import jwtDecode from 'jwt-decode';
import SearchResults from '../../components/searchResults';
import TeacherUserlist from '../../components/TeacherUserlist';
import useAuth from '../../hooks/useAuth';
import { ProfileIconColor } from '../../userUtils/profileIconColor';

const Dashboard = () => {
  const [cohortId, setCohortId] = useState(null);
  const storedToken = localStorage.getItem('token');
  const decodedToken = jwtDecode(storedToken);
  const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
  const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  const userURL = `https://localhost:7233/users/`;
  const { loggedInUser } = useAuth();
  const profileIconColor = ProfileIconColor(loggedInUser?.id || 0);

  useEffect(() => {
    fetch(`${userURL}${userId}`)
      .then((res) => res.json())
      .then((data) => {
        setCohortId(data.data.cohortId);
      })
      .catch(() => setCohortId(null));
  }, [userId]);

  // Use the useModal hook to get the openModal and setModal functions
  const { openModal, setModal } = useModal();

  // Create a function to run on user interaction
  const showModal = () => {
    // Use setModal to set the header of the modal and the component the modal should render
    setModal('Create a post', <CreatePostModal />); // CreatePostModal is just a standard React component, nothing special

    // Open the modal!
    openModal();
  };

  const initials = loggedInUser
    ? `${loggedInUser.firstName.charAt(0)}${loggedInUser.lastName.charAt(0)}`
    : '';

  return (
    <>
      <main>
        <Card>
          <div className="create-post-input">
            <div className="profile-icon" style={{ backgroundColor: profileIconColor }}>
              <p>{initials}</p>
            </div>
            <Button text="What's on your mind?" onClick={showModal} />
          </div>
        </Card>

        <Posts />
      </main>

      <aside>
        <Card>
          <SearchResults />
        </Card>

        <Card>
          {userRole !== 'Teacher' && <CohortList cohortId={cohortId} userId={userId} />}
          {userRole === 'Teacher' && (
            <TeacherUserlist title={'Students'} userId={userId} role={'Student'} />
          )}
        </Card>

        {userRole === 'Teacher' && (
          <Card>
            <TeacherUserlist title="Teachers" userId={userId} role="Teacher" />
          </Card>
        )}
      </aside>
    </>
  );
};

export default Dashboard;
