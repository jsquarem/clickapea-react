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
      // let checkmark = <Check />;
      // let checkmarkClass = 'text-success disabled';
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
            {/* <div className="row">
              <div className="col-9">{recipe.title}</div>
              <div className="d-flex col-3">
                <span className="input-group-btn">
                  <Button
                    className="btn btn-default btn-number rounded-circle p-0"
                    //disabled="disabled"
                    data-type="minus"
                    data-field="quant[1]"
                  >
                    <PlusCircle
                      className="p-0 m-0"
                      style={{ fontSize: '2rem' }}
                    />
                  </Button>
                </span>
                <span className="input-container">
                  <input
                    type="text"
                    name="quant[1]"
                    className="form-control input-number"
                    //value="1"
                    min="1"
                    max="10"
                    style={{ width: '20px' }}
                  />
                </span>
                <span className="input-group-btn">
                  <Button
                    className="btn btn-default btn-number rounded-circle p-0"
                    data-type="plus"
                    data-field="quant[1]"
                  >
                    <DashCircle
                      className="p-0 m-0"
                      style={{ fontSize: '2rem' }}
                    />
                  </Button>
                </span>
              </div>
            </div> */}
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
