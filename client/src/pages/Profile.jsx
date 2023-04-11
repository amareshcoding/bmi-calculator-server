import React, { useEffect, useState } from 'react';
import NavbarComponent from '../components/NavBar';

const Profile = () => {
  
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('bmi-app-user'));
    setUser(user.user);
  }, []);
  return (
    <div>
      <NavbarComponent />
     
      <div
        style={{
          width: '300px',
          height: '300px',
          margin: '20px auto',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          border: '1px solid',
        }}
      >
        <h3>{user?.userName}</h3>
        <h5>{user?.email}</h5>
      </div>
    </div>
  );
};

export default Profile;
