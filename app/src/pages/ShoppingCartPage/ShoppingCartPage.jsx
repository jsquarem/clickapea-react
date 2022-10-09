import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CartRecipeList from '../../components/CartRecipeList/CartRecipeList';
import CartShoppingList from '../../components/CartShoppingList/CartShoppingList';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import Container from 'react-bootstrap/Container';

export default function ShoppingCartPage({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const fetchRecipes = async () => {
    try {
      const response = await recipeBookAPI.getBooks();

      setRecipes(response);
    } catch (err) {
      console.log(err.message);
    }
  };
  console.log(recipes, '<-recipes');

  const handleClick = (e) => {
    let newCart = [];
    const recipeID = e.target.id;
    if (cartItems.includes(recipeID)) {
      setCartItems(cartItems.filter((i) => i !== recipeID));
    } else {
      setCartItems([...cartItems, recipeID]);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, []);

  return recipes.length > 0 ? (
    <Container style={{ minHeight: '73.4vh' }}>
      <div className="row my-3">
        <h1 className="text-center">Shopping Cart</h1>
        <hr />
        <div className="col-12 col-md-4">
          <h2 className="mb-1">Recipes</h2>
          <CartRecipeList
            shoppingList={cartItems}
            recipes={recipes}
            onClick={handleClick}
          />
        </div>
        <div className="col-12 col-md-6 offset-md-2">
          <h2 className="mb-1">Cart Items</h2>
          {cartItems.length > 0 ? (
            <CartShoppingList shoppingList={cartItems} />
          ) : (
            <p>
              Click on a recipe to the right to add ingredients to the cart.
            </p>
          )}
        </div>
      </div>
    </Container>
  ) : (
    <Container style={{ minHeight: '73.4vh' }}>
      <div className="row my-3">
        <h1 className="text-center">Shopping Cart</h1>
        <hr />
        <div className="col-12 col-md-4 mt-3">
          <h2 className="mb-1">You have no Recipe Books</h2>
          <p>
            Try adding a recipe to a recipe book by clicking the button shown
            below on the recipe page, after importing or finding a recipe.
          </p>
          <p className="text-center">
            <Link to="/recipes">Go back to the Recipe Page</Link>
          </p>
          <img
            style={{ width: '100%' }}
            src="https://catcollection7-11.s3.us-east-2.amazonaws.com/add-recipe-button.png"
          />
        </div>
      </div>
    </Container>
  );
}
