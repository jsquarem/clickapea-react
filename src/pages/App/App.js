import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import { Grid } from 'semantic-ui-react'
import userService from '../../utils/userService';


function App() {
  const [user, setUser] = useState(userService.getUser());


  // we pass this down, whenever we get a new token back from the server
  // we need to decode it and put that object in state
  function handleSignUpOrLogin(){
    setUser(userService.getUser())
  }

  return (
    <Grid className="App">
      <Routes>
          <Route path='/' element={<h1>THis is the HOME</h1>} />
          <Route path="/login" element={<LoginPage />} />
          
          <Route path="/signup" element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin}/>} />
      </Routes>
    </Grid>
  );
}

export default App;