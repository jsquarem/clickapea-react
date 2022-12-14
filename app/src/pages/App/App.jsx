import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import './Custom.scss';
import RecipePage from '../RecipePage/RecipePage';
import RecipeBooksPage from '../RecipeBooksPage/RecipeBooksPage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';
import NavBar from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import userService from '../../utils/userService';
import MealPlannerPage from '../MealPlannerPage/MealPlannerPage';
import ShoppingListPage from '../ShoppingListPage/ShoppingListPage';
import RecipeLoading from '../../components/RecipeLoading/RecipeLoading';

export default function App() {
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
        <Route exact path="/" element={<HomePage user={user} />} />
        <Route path="/planner" element={<MealPlannerPage user={user} />} />
        <Route path="/list" element={<ShoppingListPage user={user} />} />
        <Route path="/loading" element={<RecipeLoading user={user} />} />
        <Route path="/recipes/" element={<RecipePage user={user} />} />
        <Route path="/books/" element={<RecipeBooksPage user={user} />} />
        <Route path="/recipes/:recipeID" element={<RecipePage user={user} />} />
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
