import 'bootstrap/dist/css/bootstrap.min.css';
import Auth from './pages/Auth';
import DashBoard from './pages/DashBoard';
import { Routes, Route } from 'react-router-dom';
import BmiCalculator from './pages/BmiCalculator';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/bmi" element={<BmiCalculator />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
