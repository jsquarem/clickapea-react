import tokenService from './tokenService';

const BASE_URL = '/api/users/';

function signup(user) {
  console.log(user, '<-user in signup');
  return fetch(BASE_URL + 'signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error('Email already taken!');
    })
    .then(({ token }) => tokenService.setToken(token));
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
  })
    .then((res) => {
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
