import tokenService from './tokenService';

const BASE_URL = '/api/recipes/import';

export function addRecipe(recipeURL) {
  console.log(recipeURL, '<-- recipeBook in api');
  return fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(recipeURL),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    return res.json().then((response) => {
      console.log(response);
      throw new Error(response.error);
    });
  });
}

export function searchRecipes(query) {
  const queryURL = `/recipe/search/${query}`;
  return fetch('/recipe/search', {
    method: 'GET',
    body: JSON.stringify(queryURL),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokenService.getToken(),
    },
  }).then((res) => {
    if (res.ok) return res.json();
    return res.json().then((response) => {
      console.log(response);
      throw new Error(response.error);
    });
  });
}
