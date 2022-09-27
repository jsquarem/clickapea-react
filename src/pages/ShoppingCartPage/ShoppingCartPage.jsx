import { useCallback, useEffect, useState } from 'react';
import CartRecipeList from '../../components/CartRecipeList/CartRecipeList';
import CartShoppingList from '../../components/CartShoppingList/CartShoppingList';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import Container from 'react-bootstrap/Container';

export default function ShoppingCartPage({ user }) {
  const [recipes, setRecipes] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchRecipes = async () => {
    console.log(user, '<-user');
    console.log(recipes);
    try {
      const response = await recipeBookAPI.getBooks();
      setRecipes(response.recipeBooks);
      //setLoading(false);
      console.log(response.recipeBooks, '<-response');
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleClick = (e) => {
    let newCart = [];
    const recipeID = e.target.id;
    if (cartItems.includes(recipeID)) {
      setCartItems(cartItems.filter((i) => i !== recipeID));
    } else {
      setCartItems([...cartItems, recipeID]);
    }

    //setCartItems
  };

  useEffect(() => {
    fetchRecipes();
  }, []);
  console.log(cartItems.length, '<-cartItems.length');

  return (
    <Container style={{ minHeight: '73.4vh' }}>
      <div className="row">
        <div className="col-12 col-md-4 mt-3">
          <CartRecipeList
            shoppingList={cartItems}
            recipes={recipes}
            onClick={handleClick}
          />
        </div>
        <div className="col-12 col-md-6 offset-md-2">
          {cartItems.length > 0 && (
            <CartShoppingList shoppingList={cartItems} />
          )}
        </div>
      </div>
    </Container>
  );
}
