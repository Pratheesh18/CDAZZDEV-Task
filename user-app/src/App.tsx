import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Register from './components/Register';
import User from './components/UserProfile';

const App: React.FC = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route  path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </Router>
    <ToastContainer hideProgressBar={true} autoClose={3000} position="bottom-right" />
    </>
  );
};

export default App;
