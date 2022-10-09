import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import NavDropdown from 'react-bootstrap/NavDropdown';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import './NavRecipeBooks.css';

export default function RecipeBooks({ user }) {
  const [recipeBooks, setRecipeBooks] = useState([]);

  const updateRecipeBooks = async () => {
    try {
      const recipeBooksResponse = await recipeBookAPI.getBooks();
      setRecipeBooks(recipeBooksResponse);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    updateRecipeBooks();
  }, []);
  console.log(recipeBooks);
  const recipeBooksComponent = recipeBooks.map((recipeBook) => {
    const recipeComponents = recipeBook.recipes.map((recipe) => {
      return (
        <NavDropdown.Item
          key={recipe._id}
          as={Link}
          to="/recipes"
          state={{ query: recipe._id, profile: null }}
        >
          {recipe.title}
        </NavDropdown.Item>
      );
    });
    return (
      <NavDropdown
        title={
          <>
            {recipeBook.name}
            <span
              className="text-right"
              style={{ position: 'absolute', right: 10 }}
            >
              {'>'}
            </span>
          </>
        }
        key={recipeBook._id}
      >
        {recipeComponents}
      </NavDropdown>
    );
  });
  // }
  return recipeBooks.length > 0 ? (
    <NavDropdown
      title={
        <>
          Saved Recipes <ChevronDown style={{ fontSize: '1.25rem' }} />
        </>
      }
      id="basic-nav-dropdown"
      className="main-nav-dropdown"
    >
      {recipeBooksComponent}
    </NavDropdown>
  ) : (
    <NavDropdown
      title={
        <>
          Saved Recipes <ChevronDown style={{ fontSize: '1.25rem' }} />
        </>
      }
      id="basic-nav-dropdown"
      className="main-nav-dropdown"
    >
      <NavDropdown.Item>You have no recipes</NavDropdown.Item>
    </NavDropdown>
  );
}
