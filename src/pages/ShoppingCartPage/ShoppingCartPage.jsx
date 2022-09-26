import { useCallback, useState } from 'react';
import CartRecipeList from '../../components/CartRecipeList/CartRecipeList';
import * as recipeAPI from '../../utils/recipeAPI';

export default function ShoppingCartPage({ user }) {
  const [recipes, setRecipes] = useState([]);
  const fetchRecipes = useCallback(async () => {
    console.log(user, '<-user');
    try {
      const response = await recipeAPI.profileRecipes(user.profile);
    } catch (err) {
      console.log(err.message);
    }
  }, []);

  fetchRecipes();

  return (
    <div className="col-4">
      <CartRecipeList recipes={recipes} />
    </div>
  );
}
