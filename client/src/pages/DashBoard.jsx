/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavbarComponent from '../components/NavBar';
import { base_url } from '../utils';
import { Table } from 'react-bootstrap';

const DashBoard = () => {
  const [bmiHistory, setBmiHistory] = useState([]);
  console.log('bmiHistory: ', bmiHistory);

  useEffect(() => {
    getBmiHistory();
  }, []);

  const getBmiHistory = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${
            JSON.parse(localStorage.getItem('bmi-app-user'))?.token
          }`,
        },
      };
      const res = await axios.get(`${base_url}/bmi`, config);
      const data = res.data;
      console.log('data: ', data);
      setBmiHistory(data);
    } catch (err) {
      console.log('err: ', err);
    }
  };

  return (
    <div>
      <NavbarComponent />
      <div style={{ padding: '20px' }}>
        <Table responsive striped bordered hover>
          <thead>
            <tr>
              <th>Index</th>
              <th>Date</th>
              <th>Weight</th>
              <th>Height</th>
              <th>BMI</th>
            </tr>
          </thead>

          <tbody>
            {bmiHistory.length > 0 ? (
              bmiHistory.map((bmi, i) => (
                <tr key={bmi._id}>
                  <td>{i + 1}</td>
                  <td>{bmi?.createdAt?.substr(0, 10)}</td>
                  <td>{bmi?.weight}</td>
                  <td>{bmi?.height}</td>
                  <td>{bmi?.bmi}</td>
                </tr>
              ))
            ) : (
              <h3>No History Found</h3>
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default DashBoard;
