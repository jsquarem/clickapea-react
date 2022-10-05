import { useCallback, useEffect, useState } from 'react';
import * as recipeAPI from '../../utils/recipeAPI';

export default function CartShoppingList({ shoppingList }) {
  const [shoppingListItems, setShoppingListItems] = useState([]);
  const fetchRecipes = useCallback(async () => {
    try {
      const response = await recipeAPI.getRecipes(shoppingList);
      setShoppingListItems(response);
    } catch (err) {
      console.log(err.message);
    }
  }, [shoppingList]);

  useEffect(() => {
    fetchRecipes();
  }, [shoppingList, fetchRecipes]);
  return (
    <div className="col-12 bg-white rounded my-4 py-3">
      {shoppingListItems.map((aisle, index) => {
        return (
          <div key={`aisle-${index}`}>
            <div className="row">
              <div className="col-10 offset-2">
                <h4>{aisle.aisle}</h4>
              </div>
            </div>
            {aisle.ingredients.map((ingredient, index) => {
              let image = 'no.jpg';
              if (ingredient.image) {
                image = ingredient.image;
              }
              return (
                <div className="row" key={ingredient.id + '-' + index}>
                  <div className="col-1 offset-2">
                    <div className="form-check form-switch">
                      <input className="form-check-input" type="checkbox" />
                    </div>
                  </div>
                  <div className="col-6 d-flex">
                    <div className="col-4">
                      {ingredient.amountUS}
                      <span className="px-2">{ingredient.unitUS}</span>
                    </div>
                    <div className="col-8">{ingredient.name}</div>
                  </div>
                  <div className="col-auto">
                    <img
                      style={{ width: '30px', height: '30px' }}
                      src={`https://spoonacular.com/cdn/ingredients_100x100/${image}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
