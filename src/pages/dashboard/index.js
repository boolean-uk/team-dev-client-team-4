import {useState, useEffect, useContext} from 'react';
import Button from '../../components/button';
import Card from '../../components/card';
import CreatePostModal from '../../components/createPostModal';
import Posts from '../../components/posts';
import CohortList from '../../components/cohortlist';
import useModal from '../../hooks/useModal';
import './style.css';
import SearchResults from '../../components/searchResults';
import TeacherUserlist from '../../components/TeacherUserlist';
import useAuth from '../../hooks/useAuth';
import {ProfileIconColor} from '../../userUtils/profileIconColor';
import {getPosts} from "../../service/apiClient";
import { userContext } from '../../context/userContext';
import { myCohortCourseContext } from '../../context/myCohortCourseContext';

const Dashboard = () => {
    const { user } = useContext(userContext);
    const { cohort } = useContext(myCohortCourseContext);
    const {loggedInUser} = useAuth();
    const {openModal, setModal} = useModal();
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
        refreshPosts();
    }, [user]);
    
    
    if (user === null) { return "Loading user" }
    if (cohort === null) { return "loading cohort" }

    const userId = user.id;
    const userRole = user.role;
    const profileIconColor = ProfileIconColor(loggedInUser?.id || 0);
    return (
        <>
            <main>
                <Card>
                    <div className="create-post-input">
                      <ProfileCircle
                        initials={initials}
                        uniqueKey={`create-post-profile-circle-${userId}`}
                        role={userRole}
                        userId={loggedInUser?.id}
                        name={`${loggedInUser?.firstName} ${loggedInUser?.lastName}`}
                        user={loggedInUser}
                      />
                      <Button text="What's on your mind?" onClick={showModal}/>
                    </div>
                </Card>

                <Posts posts={posts} refreshPosts={refreshPosts}/>
            </main>

            <aside>
                <Card>
                    <SearchResults/>
                </Card>

        {userRole === 'Teacher' && (
          <Card>
            <Cohorts />
          </Card>
        )}

        <Card>
                    {userRole !== 'Teacher' && <CohortList userId={userId}/>}
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
