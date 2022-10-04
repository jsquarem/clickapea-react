import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';
import './Custom.scss';
// import RecipeBookPage from '../RecipeBookPage/RecipeBookPage';
import ImportRecipePage from '../ImportRecipePage/ImportRecipePage';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import HomePage from '../HomePage/HomePage';
import NavBar from '../../components/Nav/Nav';
import Footer from '../../components/Footer/Footer';
import userService from '../../utils/userService';
import MealPlannerPage from '../MealPlannerPage/MealPlannerPage';
import ShoppingCartPage from '../ShoppingCartPage/ShoppingCartPage';
import RecipePage from '../RecipePage/RecipePage';
import RecipeLoading from '../../components/RecipeLoading/RecipeLoading';

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
        <Route exact path="/" element={<HomePage user={user} />} />
        <Route path="/recipes" element={<RecipePage user={user} />} />
        <Route path="/planner" element={<MealPlannerPage user={user} />} />
        <Route path="/cart" element={<ShoppingCartPage user={user} />} />
        <Route path="/loading" element={<RecipeLoading user={user} />} />
        <Route
          path="/recipes/import"
          element={<ImportRecipePage user={user} />}
        />
        <Route
          path="/recipes/import/:recipeID"
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
