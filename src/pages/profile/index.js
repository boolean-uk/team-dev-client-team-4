import Card from '../../components/card';
import './profile.css';
import jwt_decode from 'jwt-decode';
import { get, patch } from '../../service/apiClient';
import { useEffect, useState } from 'react';
import Form from '../../components/form';
import TextInput from '../../components/form/textInput';

const Profile = () => {
  const [user, setUser] = useState()
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
  
  const [errors, setErrors] = useState({ firstName: [], lastName: [] })
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
    const decoded = jwt_decode(storedToken);
    const thisId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
    console.log(thisId)

    const fetchUser = async () => {
      const tempUser = await get(`users/${thisId}`).then(result => result.data)
      // console.log(tempUser)
      setProfile(tempUser)
    }

    fetchUser()
  }, [])
  console.log(user)

  // Save handler
  const handleSave = async () => {
    const storedToken = localStorage.getItem('token');
    const decoded = jwt_decode(storedToken);
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
    }
    try {
      await patch(`users/${thisId}`, body)
      // Optionally show success feedback here
      alert('Profile updated successfully!')
    } catch (err) {
      // Optionally show error feedback here
      alert('Failed to update profile.')
    }
  }

  return (
    <>
      <main>
        <Card>
            <h1>Profile Placeholder</h1>
            <Form className="profile-form" onSubmit={e => handleSave(e)}>
              <div className='form-left-part'>
              <div className="form-basic-info">
                <h3>Basic info</h3>
                <TextInput
                  onChange={onChange}
                  value={profile.firstName}
                  name="firstName"
                  label={'First name*'}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.lastName}
                  name="lastName"
                  label={'Last name*'}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.username}
                  name="username"
                  label={'Username*'}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.githubUsername}
                  name="githubUsername"
                  label={'Github Username*'}
                />
              </div>
              <div className="form-contact-info">
                <h3>Contact info</h3>
                <TextInput
                  onChange={onChange}
                  value={profile.email}
                  name="email"
                  label={'Email*'}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.phone}
                  name="phone"
                  label={'Phone*'}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.password}
                  name="password"
                  label={'Password*'}
                  type="password"
                  disabled = {true}
                />
              </div>
              </div>
              <div className="form-right-part">
              <div className="form-training-info">
                <h3>Training info</h3>
                <TextInput
                  onChange={''}
                  value={''}
                  name="Role"
                  label={'Role*'}
                  disabled = {true}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.specialism}
                  name="Specialism"
                  label={'Specialism*'}
                  disabled = {true}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.cohortId}
                  name="cohort"
                  label={'Cohort*'}
                  disabled = {true}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.startDate}
                  name="startDate"
                  label={'Start Date*'}
                  disabled = {true}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.endDate}
                  name="endDate"
                  label={'End Date*'}
                  disabled = {true}
                />
              </div>
              </div>
              <div className='form-bio'>
                <h3>Bio</h3>
                <textarea name="bio" value={profile.bio} onChange={onChange} label="Bio"></textarea>
              </div>
              <button type="submit" className="save-btn">Save</button>
            </Form>
        </Card>
      </main>
    </>
  )
}

export default Profile;
