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
    console.log(ingredientState, '<-ingredientState');

    let row = '';
    for (let i = 0; i < ingredientState.length; i += 2) {
      let ingredientOne = '';
      let ingredientTwo = '';
      ingredientOne = ingredientState[i].original;
      ingredientTwo = ingredientState[i + 1]?.original;
      row = (
        <tr key={i}>
          <td>{ingredientOne}</td>
          <td>{ingredientTwo}</td>
        </tr>
      );
      ingredientsTable.push(row);
    }
  }
  //return <h1>ingredient list</h1>;
  return (
    <div className="col-12 mt-2">
      <h4 className="text-center">Ingredients</h4>
      <Table size="sm">
        <tbody>{ingredientsTable}</tbody>
      </Table>
    </div>
  );
}
