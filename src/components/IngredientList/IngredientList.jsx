import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useEffect } from 'react';

export default function IngredientList({ ingredients }) {
  const [ingredientState, setIngredientState] = useState(null);

  useEffect(() => {
    setIngredientState(ingredients);
  }, []);

  const ingredientsTable = [];
  if (ingredientState) {
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
  return (
    <div className="col-12 mt-2">
      <h2 className="text-center">Ingredients</h2>
      <Table size="sm">
        <tbody>{ingredientsTable}</tbody>
      </Table>
    </div>
  );
}
