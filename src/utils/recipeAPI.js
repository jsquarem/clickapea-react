import tokenService from './tokenService';

const BASE_URL = '/api/recipes';

export function addRecipe(recipeURL) {
  const queryURL = `${BASE_URL}/import`;
  console.log(recipeURL, '<-- recipeBook in api');
  return fetch(queryURL, {
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

export function profileRecipes(query = '') {
  const queryURL = `${BASE_URL}/search/profile/${query}`;
  console.log(queryURL, '<-queryURL');
  return fetch(queryURL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokenService.getToken(),
    },
  }).then((res) => {
    console.log(res, '<-res');
    if (res.ok) return res.json();
    return res.json().then((response) => {
      console.log(response);
      throw new Error(response.error);
    });
  });
}
