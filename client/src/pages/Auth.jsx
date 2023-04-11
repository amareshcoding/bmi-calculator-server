import axios from 'axios';
import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { base_url } from '../utils';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [bg, setBg] = useState('success');
  const [toastMassage, setToastMassage] = useState('');

  let [authMode, setAuthMode] = useState('signin');
  const changeAuthMode = () => {
    setAuthMode(authMode === 'signin' ? 'signup' : 'signin');
  };

  const [signInInput, setSignInInput] = useState({
    email: '',
    password: '',
  });

  const [signUpInput, setSignUpInput] = useState({
    userName: '',
    email: '',
    password: '',
  });

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${base_url}/login`, signInInput);
      const data = res.data;
      localStorage.setItem('bmi-app-user', JSON.stringify(data));

      setToastMassage('SignIn success!');
      setBg('success');
      setShow(true);
      setTimeout(() => {
        navigate('/bmi');
      }, 2000);
    } catch (err) {
      setToastMassage('Error occurred!');
      setBg('danger');
      setShow(true);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${base_url}/register`, signUpInput);

      setToastMassage('SignUp success!');
      setBg('success');
      setShow(true);
      setAuthMode('signin');
    } catch (err) {
      setToastMassage('Error occurred!');
      setBg('danger');
      setShow(true);
    }
  };

  if (authMode === 'signin') {
    return (
      <div className="Auth-form-container">
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
        <form onSubmit={handleSignIn} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                value={signInInput.email}
                onChange={(e) =>
                  setSignInInput({ ...signInInput, email: e.target.value })
                }
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                value={signInInput.password}
                onChange={(e) =>
                  setSignInInput({ ...signInInput, password: e.target.value })
                }
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </div>
          <div className="text-center">
            Not registered yet?{' '}
            <span
              className="link-primary"
              style={{ cursor: 'pointer' }}
              onClick={changeAuthMode}
            >
              Sign Up
            </span>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="Auth-form-container">
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
      <form onSubmit={handleSignUp} className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="form-group mt-1">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              value={signUpInput.userName}
              onChange={(e) =>
                setSignUpInput({
                  ...signUpInput,
                  userName: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group mt-1">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              value={signUpInput.email}
              onChange={(e) =>
                setSignUpInput({
                  ...signUpInput,
                  email: e.target.value,
                })
              }
            />
          </div>

          <div className="form-group mt-1">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              value={signUpInput.password}
              onChange={(e) =>
                setSignUpInput({
                  ...signUpInput,
                  password: e.target.value,
                })
              }
            />
          </div>

          <div className="d-grid gap-2 mt-1">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
        </div>
        <div className="text-center">
          Already registered?{' '}
          <span
            className="link-primary"
            style={{ cursor: 'pointer' }}
            onClick={changeAuthMode}
          >
            Sign In
          </span>
        </div>
      </form>
    </div>
  );
};

export default Auth;
