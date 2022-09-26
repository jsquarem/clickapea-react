import { useCallback, useState } from 'react';
import * as recipeAPI from '../../utils/recipeAPI';

export default function CartRecipeList({ recipes }) {
  const recipeList = recipes.map(() => {});

  return (
    <ul class="list-group list-group-flush">
      <li class="list-group-item">An item</li>
      <li class="list-group-item">A second item</li>
      <li class="list-group-item">A third item</li>
      <li class="list-group-item">A fourth item</li>
      <li class="list-group-item">And a fifth one</li>
    </ul>
  );
}
