import { useCallback, useState } from 'react';
import * as recipeBookAPI from '../../utils/recipeBookAPI';
import { Check } from 'react-bootstrap-icons';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { PlusCircle, DashCircle } from 'react-bootstrap-icons';

export default function CartRecipeList({ recipes, onClick, shoppingList }) {
  const [cartList, setCartList] = useState([]);

  const recipeBoks = recipes.map((book) => {
    const recipeListItems = book.recipes.map((recipe) => {
      if (shoppingList.includes(recipe._id)) {
        return (
          <li
            key={recipe._id}
            id={recipe._id}
            className="list-group-item list-group-item-action text-success"
            onClick={onClick}
          >
            <Check />
            {recipe.title}
          </li>
        );
      } else {
        return (
          <li
            key={recipe._id}
            id={recipe._id}
            className="list-group-item list-group-item-action"
            onClick={onClick}
          >
            {recipe.title}
          </li>
        );
      }
    });
    return (
      <div key={book._id} className="pt-3">
        <h5>{book.name}</h5>
        <ul className="list-group list-group-flush rounded border">
          {recipeListItems}
        </ul>
      </div>
    );
  });

  return <>{recipeBoks}</>;
}
