import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Custom.scss';
// import RecipeBookPage from '../RecipeBookPage/RecipeBookPage';
import ImportRecipePage from '../ImportRecipePage/ImportRecipePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';
import NavBar from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import Container from 'react-bootstrap/Container';
import userService from '../../utils/userService';
import MealPlannerPage from '../MealPlannerPage/MealPlannerPage';
import ShoppingCartPage from '../ShoppingCartPage/ShoppingCartPage';

function App() {
  const [user, setUser] = useState(userService.getUser());

  function handleSignUpOrLogin() {
    setUser(userService.getUser());
  }

  function handleLogout() {
    userService.logout();
    setUser(null);
  }

  return (
    <Router>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        {/* <Route path="/recipes/books" element={<RecipeBookPage />} /> */}
        <Route path="/planner" element={<MealPlannerPage user={user} />} />
        <Route path="/cart" element={<ShoppingCartPage user={user} />} />
        <Route
          path="/recipes/import"
          element={<ImportRecipePage user={user} />}
        />
        <Route
          path="/login"
          element={<LoginPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
        <Route
          path="/signup"
          element={<SignupPage handleSignUpOrLogin={handleSignUpOrLogin} />}
        />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
