import React, { useState } from 'react';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';

export default function IngredientList({ ingredients }) {
  const [state, setState] = useState('');
  const [ingredientState, setIngredientState] = useState(null);

  useEffect(() => {
    setIngredientState(ingredients);
  }, []);

  const ingredientsTable = [];
  if (ingredientState) {
    let j = 0;
    let row = '';
    for (let i = 0; i < ingredientState.length; i += 2) {
      const ingredientOne = ingredientState[i].original;
      const ingredientTwo = ingredientState[i + 1].original;
      row = (
        <tr key={i}>
          <td>{ingredientOne}</td>
          <td>{ingredientTwo}</td>
        </tr>
      );
      ingredientsTable.push(row);
      j++;
    }
  }
  //return <h1>ingredient list</h1>;
  return (
    <div class="col-12 col-lg-6 mt-4">
      <div class="row">
        <h4 class="text-center">Ingredients</h4>
        <Table bordered size="sm">
          <tbody>{ingredientsTable}</tbody>
        </Table>
      </div>
    </div>
  );
}
