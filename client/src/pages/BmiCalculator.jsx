import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { base_url } from '../utils';
import NavbarComponent from '../components/NavBar';
import { Toast, ToastContainer } from 'react-bootstrap';

const BmiCalculator = () => {
  const [show, setShow] = useState(false);
  const [bg, setBg] = useState('success');
  const [toastMassage, setToastMassage] = useState('');

  const [user, setUser] = useState({});

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('bmi-app-user'));
    setUser(user);
  }, []);

  const [bmiInputs, setBmiInputs] = useState({
    weight: '',
    height: '',
  });
  console.log('bmiInputs: ', bmiInputs);

  const bmiCalculatorHandler = async (e) => {
    e.preventDefault();

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const res = await axios.post(
        `${base_url}/bmi`,
        {
          weight: Number(bmiInputs.weight),
          height: Number(bmiInputs.height),
        },
        config
      );

      const data = res.data;

      setToastMassage(`Hi ${user?.user.userName} your BMI is ${data?.bmi}`);
      setBg('success');
      setShow(true);
    } catch (err) {
      setToastMassage('Error occurred!');
      setBg('danger');
      setShow(true);
    } finally {
      setBmiInputs({
        weight: '',
        height: '',
      });
    }
  };

  return (
    <div>
      <NavbarComponent />
      <div className="Auth-form-container" style={{ marginTop: '-40px' }}>
        <form onSubmit={bmiCalculatorHandler} className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">BMI CALCULATOR</h3>

            <div className="form-group mt-3">
              <label>Weight</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Weight in kg"
                value={bmiInputs.weight}
                onChange={(e) =>
                  setBmiInputs({
                    ...bmiInputs,
                    weight: e.target.value,
                  })
                }
              />
            </div>

            <div className="form-group mt-3">
              <label>Height</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Height in ft."
                value={bmiInputs.height}
                onChange={(e) =>
                  setBmiInputs({
                    ...bmiInputs,
                    height: e.target.value,
                  })
                }
              />
            </div>

            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn btn-primary">
                CALCULATE
              </button>
            </div>
          </div>
        </form>
      </div>
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
    </div>
  );
};

export default BmiCalculator;
