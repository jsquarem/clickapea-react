import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
  console.log(user, '<-user in signup');
  return (
    fetch(BASE_URL + 'signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // by default the browser will detect the content of the fetch, and see that it is multipart/formdata
      // so you don't have to set the headers, please make you don't JSON.stringigy the
      // body, becuase it is already formData, which is what type we're sending over

      // If you are sending a file/photo over
      // what do datatype do you need to change this too?
      body: JSON.stringify(user), // <-- formData from the signup page userService.signup(formData)
    }) // <- this code and above is what makes the request to the server
      .then((res) => {
        // Inside the .then, is the response from the server!
        if (res.ok) return res.json();
        // if we get any response from the server that isn't in 200's
        // we throw an error, to inform the client (You still have to look at the server terminal)
        // to figure why you aren't getting a good response (Aka your server is broke)
        // Probably a duplicate email

        // TODO
        // Figure out how to see what the error message is from the server,
        // and make the throw error more dynamic, Example, Hey you forgot to upload
        // an image!

        throw new Error('Email already taken!');
      })
      // Parameter destructuring!
      .then(({ token }) => tokenService.setToken(token))
  );
  // The above could have been written as
  //.then((token) => token.token);
}

function getUser() {
  return tokenService.getUserFromToken();
}

function logout() {
  tokenService.removeToken();
}

function login(creds) {
  return fetch(BASE_URL + 'login', {
    method: 'POST',
    headers: new Headers({ 'Content-Type': 'application/json' }),
    body: JSON.stringify(creds),
  }) // <- the request to the server!
    .then((res) => {
      // response from the server!
      // Valid login if we have a status of 2xx (res.ok)
      if (res.ok) return res.json();
      throw new Error('Bad Credentials!');
    })
    .then(({ token }) => tokenService.setToken(token));
}

const userService = {
  signup,
  getUser,
  logout,
  login,
};

export default userService;
