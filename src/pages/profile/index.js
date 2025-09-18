import Card from '../../components/card';
import './profile.css';
import jwtDecode from 'jwt-decode';
import { get, patch } from '../../service/apiClient';
import { useEffect, useState } from 'react';
import Form from '../../components/form';
import TextInput from '../../components/form/textInput';

const Profile = () => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    username: '',
    githubUsername: '',
    bio: '',
    email: '',
    phone: '',
    password: '',
    id: '',
    cohortId: '',
    startDate: '',
    endDate: '',
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

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const decoded = jwtDecode(storedToken);
    const thisId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
    const fetchUser = async () => {
      const tempUser = await get(`users/${thisId}`).then((result) => result.data);
      setProfile(tempUser);
      setOriginalProfile(tempUser);
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
      phone: profile.phone
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
        <Card>
          <h1>Profile Placeholder</h1>
          <Form className="profile-form" onSubmit={handleSave}>
            <div className="form-left-part">
              <div
                className="form-basic-info"
                style={{ filter: isEditing ? 'none' : 'grayscale(100%)' }}
              >
                <h3>Basic info</h3>
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
              <div
                className="form-contact-info"
                style={{ filter: isEditing ? 'none' : 'grayscale(100%)' }}
              >
                <h3>Contact info</h3>
                <TextInput
                  onChange={onChange}
                  value={profile.email}
                  name="email"
                  label={'Email*'}
                  disabled={!isEditing}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.phone}
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
                <h3>Training info</h3>
                <div className="disabled">
                  <TextInput onChange={''} value={''} name="Role" label={'Role*'} disabled={true} />
                  <TextInput
                    onChange={onChange}
                    value={profile.specialism}
                    name="Specialism"
                    label={'Specialism*'}
                    disabled={true}
                  />
                  <TextInput
                    onChange={onChange}
                    value={profile.cohortId}
                    name="cohort"
                    label={'Cohort*'}
                    disabled={true}
                  />
                  <TextInput
                    onChange={onChange}
                    value={profile.startDate}
                    name="startDate"
                    label={'Start Date*'}
                    disabled={true}
                  />
                  <TextInput
                    onChange={onChange}
                    value={profile.endDate}
                    name="endDate"
                    label={'End Date*'}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="form-bio" style={{ filter: isEditing ? 'none' : 'grayscale(100%)' }}>
                <h3>Bio</h3>
                <textarea
                  name="bio"
                  value={profile.bio}
                  onChange={onChange}
                  label="Bio"
                  disabled={!isEditing}
                ></textarea>
                <div className="buttonRow">
                  <button type="button" className="edit-btn" onClick={handleEditToggle}>
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                  <button
                    type="submit"
                    className={isEditing ? 'save-btn save-btn--active' : 'save-btn'}
                    disabled={!isEditing}
                  >
                    Save
                  </button>
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
