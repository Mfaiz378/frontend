import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chatbot from './pages/Chatbot';
import MapView from './pages/MapView';
import HospitalView from './pages/HospitalView';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      <Route path="/" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />
      
      <Route path="/chatbot" element={
        <ProtectedRoute>
          <Chatbot />
        </ProtectedRoute>
      } />
      
      <Route path="/map" element={
        <ProtectedRoute>
          <MapView />
        </ProtectedRoute>
      } />
      
      <Route path="/hospitals" element={
        <ProtectedRoute>
          <HospitalView />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default App;
