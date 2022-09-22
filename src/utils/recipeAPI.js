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
    throw new Error(
      'Bad Credentials, Check Your server terminal for more information'
    );
  });
}
