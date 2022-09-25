import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import RecipeBookPage from '../RecipeBookPage/RecipeBookPage';
import ImportRecipePage from '../ImportRecipePage/ImportRecipePage';
import CalendarPage from '../CalendarPage/CalendarPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';
import NavBar from '../../components/Nav/Nav';
import Container from 'react-bootstrap/Container';
import userService from '../../utils/userService';
import MealPlanner from '../MealPlannerPage/MealPlannerPage';

function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }

  return (
    <Router>
      <NavBar user={user} />
      <Container className="pt-3">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/recipes/books" element={<RecipeBookPage />} />
          <Route path="/planner" element={<MealPlanner />} />
          <Route
            path="/recipes/import"
            element={<ImportRecipePage user={user} />}
          />
          <Route exact path="/calendar" element={<CalendarPage />} />
          <Route
            path="/login"
            element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
          <Route
            path="/signup"
            element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
          />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
