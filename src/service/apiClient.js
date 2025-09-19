import { API_URL } from './constants';

async function login(email, password) {
  return await post('login', { email, password }, false);
}

async function register(email, password) {
  await post('users', { email, password }, false);
  return await login(email, password);
}

async function createProfile(
  userId,
  firstName,
  lastName,
  username,
  github,
  phone,
  cohortid,
  bio,
  auth
) {
  return await patch(
    `users/${userId}`,
    {
      firstName: firstName,
      lastName: lastName,
      username: username,
      github: github,
      phone: phone,
      bio: bio
    },
    auth
  );
}

async function getPosts() {
  const res = await get('posts/v2');
  return res.data.posts;
}

async function post(endpoint, data, auth = true) {
  return await request('POST', endpoint, data, auth);
}

async function patch(endpoint, data, auth = true) {
  return await request('PATCH', endpoint, data, auth);
}

async function deleteRequest(endpoint, auth = true) {
  return await request('DELETE', endpoint, null, auth);
}

async function get(endpoint, auth = true) {
  const res = await request('GET', endpoint, null, auth);
  console.log(res);
  return res;
}

async function request(method, endpoint, data, auth = true) {
  const opts = {
    headers: {
      'Content-Type': 'application/json'
    },
    method
  };

  if (method.toUpperCase() !== 'GET') {
    opts.body = JSON.stringify(data);
  }

  if (auth) {
    // eslint-disable-next-line dot-notation
    opts.headers['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, opts);

  return response.json();
}

export { login, getPosts, register, createProfile, get, patch, deleteRequest };
