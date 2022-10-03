import tokenService from './tokenService';

const BASE_URL = '/api/recipes';

export function addRecipe(recipeURL) {
  console.log(recipeURL, '<-recipeURL in api')
  const cleanURL = encodeURIComponent(recipeURL.query);
  const profileID = recipeURL.user.profile;
  const queryURL = `${BASE_URL}/import/${cleanURL}/`;
  console.log(queryURL, '<-- recipeBook in api');
  return fetch(queryURL, {
    method: 'GET',
  }).then((res) => {
    if (res.ok) return res.json();
    return res.json().then((response) => {
      console.log(response);
      throw new Error(response.error);
    });
  });
}

export function findRecipe(query) {
  console.log(query.query, '<-query')
  const cleanURL = encodeURIComponent(query.query);
  const queryURL = `${BASE_URL}/search/find/${cleanURL}/`;
  console.log(queryURL, '<-- recipeBook in api');
  return fetch(queryURL, {
    method: 'GET',
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

export function getRecipes(data) {
  const queryURL = `${BASE_URL}/search`;
  return fetch(queryURL, {
    method: 'POST',
    body: JSON.stringify(data),
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

export function getNewRecipeImages() {
  const queryURL = `${BASE_URL}/search/new`;
  console.log(queryURL, '<-queryURL');
  return fetch(queryURL, {
    method: 'GET',
  }).then((res) => {
    console.log(res, '<-res');
    if (res.ok) return res.json();
    return res.json().then((response) => {
      console.log(response);
      throw new Error(response.error);
    });
  });
}

export function searchRecipes(query) {
  const queryURL = `${BASE_URL}/search/${query}`;
  console.log(queryURL, '<-queryURL');
  return fetch(queryURL, {
    method: 'GET',
  }).then((res) => {
    console.log(res, '<-res');
    if (res.ok) return res.json();
    return res.json().then((response) => {
      console.log(response);
      throw new Error(response.error);
    });
  });
}
