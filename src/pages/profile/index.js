import Card from '../../components/card';
import './profile.css';
import jwt_decode from 'jwt-decode';
import { get } from '../../service/apiClient';
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

  return (
    <>
      <main>
        <Card>
            <h1>Profile Placeholder</h1>
            <Form className="profile-form">
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
                />
              </div>
              </div>
              <div className="form-right-part">
              <div className="form-training-info">
                <h3>Training info</h3>
                <TextInput
                  onChange={null}
                  value={''}
                  name="Role"
                  label={'Role*'}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.specialism}
                  name="Specialism"
                  label={'Specialism*'}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.cohortId}
                  name="cohort"
                  label={'Cohort*'}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.startDate}
                  name="startDate"
                  label={'Start Date*'}
                />
                <TextInput
                  onChange={onChange}
                  value={profile.endDate}
                  name="endDate"
                  label={'End Date*'}
                />
              </div>
              </div>
              <div className='form-bio'>
                <h3>Bio</h3>
                <textarea name="bio" value={profile.bio} onChange={onChange} label="Bio"></textarea>
              </div>
            </Form>
        </Card>
      </main>
    </>
  )
}

export default Profile;
