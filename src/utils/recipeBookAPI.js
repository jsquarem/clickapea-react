import tokenService from './tokenService';

const BASE_URL = '/api/recipe-books/';

// This is where we create any of the fetch calls the communicate with the routes
// in /api/routes (Routes folder => posts

export function create(recipeBook) {
  console.log(recipeBook, '<-- recipeBook in api');
  return fetch(BASE_URL, {
    method: 'POST',
    body: JSON.stringify(recipeBook),
    headers: {
      Accept: 'application/json',
      Authorization: 'Bearer ' + tokenService.getToken(), // <- this is how we send the token to the server, so the server
      // knows who the request is coming from, we're sending our jwt along in the http request!
    },
  }).then((res) => {
    if (res.ok) return res.json(); // <- the result of await postApi.create(formData) in your AddPost component

    throw new Error(
      'Bad Credentials, Check Your server terminal for more information'
    );
  });
}

export function getBooks() {
  return fetch(BASE_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + tokenService.getToken(), // <- this is how we send the token to the server, so the server
      // knows who the request is coming from, we're sending our jwt along in the http request!
    },
  }).then((res) => {
    console.log(res, '<-res');
    if (res.ok) return res.json(); // <- the result of await postApi.create(formData) in your AddPost component

    throw new Error(
      'Bad Credentials, Check Your server terminal for more information'
    );
  });
}
