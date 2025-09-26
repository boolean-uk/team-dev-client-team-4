import Card from '../../components/card';
import './profile.css';
import jwtDecode from 'jwt-decode';
import { get, patch } from '../../service/apiClient';
import { useEffect, useState } from 'react';
import Form from '../../components/form';
import TextInput from '../../components/form/textInput';
import { useParams } from 'react-router-dom';
import { PiLock } from 'react-icons/pi';
import ProfileCircle from '../../components/profileCircle';

const Profile = () => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    username: '',
    githubUsername: '',
    bio: '',
    email: '',
    mobile: '',
    password: '',
    id: '',
    cohortId: '',
    currentStartdate: '',
    currentEnddate: '',
    specialism: ''
  });

  const [errors, setErrors] = useState({ firstName: [], lastName: [] });
  const [isEditing, setIsEditing] = useState(false);
  const [originalProfile, setOriginalProfile] = useState(null);
  const onChange = (event) => {
    const { name, value } = event.target;
    setErrors({ firstName: [], lastName: [] });
    setProfile({
      ...profile,
      [name]: value
    });
  };

  const { id } = useParams();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const decoded = jwtDecode(storedToken);
    let thisId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];

    if (id != null) {
      thisId = id;
    }

    const fetchUser = async () => {
      const tempUser = await get(`users/${thisId}`).then((result) => result.data);
      setProfile(tempUser);
      setOriginalProfile(tempUser);
      console.log('USER OBJECT IN PROFILE: ', tempUser);
    };
    fetchUser();
  }, []);

  // Save handler
  const handleSave = async () => {
    const storedToken = localStorage.getItem('token');
    const decoded = jwtDecode(storedToken);
    const thisId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
    // Only send allowed fields
    const body = {
      email: profile.email,
      firstName: profile.firstName,
      lastName: profile.lastName,
      bio: profile.bio,
      github: profile.githubUsername,
      username: profile.username,
      phone: profile.mobile
    };
    try {
      const result = await patch(`users/${thisId}`, body);
      if (result.status === 'fail') {
        alert('Failed to update profile.');
      } else {
        alert('Profile updated successfully!');
        setIsEditing(false);
        setOriginalProfile(profile);
      }
    } catch (err) {
      alert('Failed to update profile.');
    }
  };

  // Toggle edit/cancel
  const handleEditToggle = () => {
    if (isEditing) {
      // Cancel: revert to original profile
      setProfile(originalProfile);
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  return (
    <>
      <main>
        <h3 style={{ marginLeft: '25px', marginBottom: '16px' }}>Profile</h3>
        <Card>
          <div className="profile-header">
            <ProfileCircle
              uniqueKey={`profile-${profile.id}`}
              role="user"
              initials={`${profile.firstName?.[0] ?? ''}${profile.lastName?.[0] ?? ''}`.toUpperCase()}
              userId={profile.id}
              name={`${profile.firstName} ${profile.lastName}`}
            />
            <div className="profile-header-info">
              <h4>
                {profile.firstName} {profile.lastName}
              </h4>
              <p className="profile-specialism">{profile.specialism}</p>
            </div>
          </div>
          <hr />
          <Form className="profile-form" onSubmit={handleSave}>
            <div className="form-left-part">
              <div
                className="form-basic-info"
                style={{ filter: isEditing ? 'none' : 'grayscale(100%)' }}
              >
                <h4>Basic info</h4>
                <TextInput
                  onChange={onChange}
                  value={profile.firstName}
                  name="firstName"
                  label={'First name*'}
                  disabled={!isEditing}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.lastName}
                  name="lastName"
                  label={'Last name*'}
                  disabled={!isEditing}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.username}
                  name="username"
                  label={'Username*'}
                  disabled={!isEditing}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.githubUsername}
                  name="githubUsername"
                  label={'Github Username*'}
                  disabled={!isEditing}
                />
              </div>
              <hr />
              <div
                className="form-contact-info"
                style={{ filter: isEditing ? 'none' : 'grayscale(100%)' }}
              >
                <h4>Contact info</h4>
                <TextInput
                  onChange={onChange}
                  value={profile.email}
                  name="email"
                  label={'Email*'}
                  disabled={!isEditing}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.mobile}
                  name="phone"
                  label={'Phone*'}
                  disabled={!isEditing}
                />
                <TextInput
                  className="disabled"
                  onChange={onChange}
                  value={profile.password}
                  name="password"
                  label={'Password*'}
                  type="password"
                  disabled={true}
                />
              </div>
            </div>
            <div className="form-right-part">
              <div
                className="form-training-info"
                style={{ filter: isEditing ? 'none' : 'grayscale(100%)' }}
              >
                <h4>Training info</h4>
                <div className="disabled">
                  <div className="input-container">
                    <TextInput
                      onChange={onChange}
                      value={profile.role}
                      name="Role"
                      label={'Role*'}
                      disabled={true}
                    />
                    <PiLock className="input-lock-icon" />
                  </div>

                  <div className="input-container">
                    <TextInput
                      onChange={onChange}
                      value={profile.specialism}
                      name="Specialism"
                      label={'Specialism*'}
                      disabled={true}
                    />
                    <PiLock className="input-lock-icon" />
                  </div>

                  <div className="input-container">
                    <TextInput
                      onChange={onChange}
                      value={profile.cohortId}
                      name="cohort"
                      label={'Cohort*'}
                      disabled={true}
                    />
                    <PiLock className="input-lock-icon" />
                  </div>

                  <div className="input-container">
                    <TextInput
                      onChange={onChange}
                      value={
                        profile.currentStartdate &&
                        new Date(profile.currentStartdate).toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      }
                      name="startDate"
                      label={'Start Date*'}
                      disabled={true}
                    />
                    <PiLock className="input-lock-icon" />
                  </div>
                  <div className="input-container">
                    <TextInput
                      onChange={onChange}
                      value={
                        profile.currentEnddate &&
                        new Date(profile.currentEnddate).toLocaleDateString('en-GB', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })
                      }
                      name="endDate"
                      label={'End Date*'}
                      disabled={true}
                    />
                    <PiLock className="input-lock-icon" />
                  </div>
                </div>
              </div>
              <hr />
              <div className="form-bio" style={{ filter: isEditing ? 'none' : 'grayscale(100%)' }}>
                <h4>Bio</h4>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={onChange}
                  label="Bio"
                  disabled={!isEditing}
                ></textarea>
                <div className="buttonRow">
                  {isEditing ? (
                    <>
                      <button type="button" className="cancel-btn" onClick={handleEditToggle}>
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="save-btn save-btn--active"
                        disabled={!isEditing}
                      >
                        Save
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="save-btn save-btn--active"
                      onClick={handleEditToggle}
                    >
                      Edit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </Form>
        </Card>
      </main>
    </>
  );
};

export default Profile;
