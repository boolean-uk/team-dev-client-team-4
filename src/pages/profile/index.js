import Card from '../../components/card';
import './profile.css';
//import { useNavigate } from 'react-router-dom';
//import { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import { get } from '../../service/apiClient';
import { useEffect, useState } from 'react';



const Profile = () => {
  const [user, setUser] = useState()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  //const [user, setUser] = useState()
  //const [user, setUser] = useState()



  useEffect( () => {
    const storedToken = localStorage.getItem('token');
    const decoded = jwt_decode(storedToken);
    const thisId = decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/sid'];
    console.log(thisId)

    const fetchUser = async () => {
        const tempUser = await get(`users/${thisId}`).then(result => result.data)
        //console.log(tempUser)
        setUser(tempUser)
    }

    fetchUser();

  }, []
  )
  console.log(user)


  return (
    <>
      <main>
        <Card>
            <h1>Profile Placeholder</h1>
            { user ? <h3> {user.email} </h3> : <h3> Loading name... </h3>}
        </Card>
      </main>
    </>
  );
};

export default Profile;
