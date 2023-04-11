import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  Navbar,
  Container,
  Nav,
  Button,
  ToastContainer,
  Toast,
} from 'react-bootstrap';
import { base_url } from '../utils';
import { useNavigate } from 'react-router-dom';

const NavbarComponent = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [bg, setBg] = useState('success');
  const [toastMassage, setToastMassage] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('bmi-app-user'));
    setUser(user);
  }, []);

  const logOut = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      axios.get(`${base_url}/logout`, config);

      localStorage.removeItem('bmi-app-user');

      setToastMassage(`Successfully logged out`);
      setBg('success');
      setShow(true);
      setTimeout(() => {
        navigate('/');
      }, 1000);
    } catch (err) {
      console.log('err: ', err);
    }
  };
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/bmi">BMI CALCULATOR </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/bmi"> CALCULATOR</Nav.Link>
            <Nav.Link href="/dashboard">BMI HISTORY</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="/profile">Hi {user?.user?.userName}</Nav.Link>
            <Button onClick={logOut}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
      <div>
        <ToastContainer className="p-3" position={'top-center'}>
          <Toast
            bg={bg}
            onClose={() => setShow(false)}
            show={show}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">{toastMassage}</strong>
            </Toast.Header>
          </Toast>
        </ToastContainer>
      </div>
    </Navbar>
  );
};

export default NavbarComponent;
