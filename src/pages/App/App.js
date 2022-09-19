import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import { Grid } from 'semantic-ui-react'

function App() {
  return (
    <Grid className="App">
      <Routes>
          <Route path='/' element={<h1>Home Page</h1>} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/signup" element={<SignupPage />} />
      </Routes>
    </Grid>
  );
}

export default App;