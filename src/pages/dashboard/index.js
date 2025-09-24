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
import { getPosts } from '../../service/apiClient';

const Dashboard = () => {
  const { loggedInUser } = useAuth();
  const { openModal, setModal } = useModal();

  const storedToken = localStorage.getItem('token');
  const decodedToken = jwtDecode(storedToken);
  const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
  const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
  const profileIconColor = ProfileIconColor(loggedInUser?.id || 0);

  const [cohortId, setCohortId] = useState(null);
  const [posts, setPosts] = useState([]);

  const showModal = () => {
    setModal('Create a post', <CreatePostModal refreshPosts={refreshPosts}/>);
    openModal();
  };

  const initials = loggedInUser
    ? `${loggedInUser.firstName.charAt(0)}${loggedInUser.lastName.charAt(0)}`
    : '';

  const refreshPosts = () => {
    getPosts().then((data) => {
      const sortedPosts = data
        .map((p) => ({
        // normalise naming to what Post component expects
          ...p,
          createdAt: p.createdAt ?? p.created_at ?? p.dateCreated,
          updatedAt: p.updatedAt ?? p.updated_at ?? p.dateUpdated,
          body: p.body ?? p.content,
          authorId: p.authorId ?? p.author_id ?? p.author?.id,
          firstname: p.firstname ?? p.firstName ?? p.author?.firstName ?? '',
          lastname: p.lastname ?? p.lastName ?? p.author?.lastName ?? '',
          comments: Array.isArray(p.comments) ? p.comments : []
        }))
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(sortedPosts);
    });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`)
      .then((res) => res.json())
      .then((data) => {
        const u = data?.data ?? {};
        const direct = u.cohortId ?? u.cohort_id;
        const viaMembership = u?.userCCs?.[0]?.cc?.cohortId ?? u?.userCCs?.[0]?.cc?.cohort?.id;
        setCohortId(direct ?? viaMembership ?? null);
      })
      .catch(() => setCohortId(null));

    refreshPosts();
  }, [userId]);

  return (
        <>
            <main>
                <Card>
                    <div className="create-post-input">
                        <div className="profile-icon" style={ { backgroundColor: profileIconColor } }>
                            <p>{initials}</p>
                        </div>
                        <Button text="What's on your mind?" onClick={showModal}/>
                    </div>
                </Card>

                <Posts posts={posts} refreshPosts={refreshPosts}/>
            </main>

            <aside>
                <Card>
                    <SearchResults/>
                </Card>

                <Card>
                    {userRole !== 'Teacher' && <CohortList cohortId={cohortId} userId={userId}/>}
                    {userRole === 'Teacher' && (
                        <TeacherUserlist title={'Students'} userId={userId} role={'Student'}/>
                    )}
                </Card>

                {userRole === 'Teacher' && (
                    <Card>
                        <TeacherUserlist title="Teachers" userId={userId} role="Teacher"/>
                    </Card>
                )}
            </aside>
        </>
  );
};

export default Dashboard;
