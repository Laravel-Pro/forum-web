import request from 'utils/request';

export async function registerUser({
  username = '',
  email = '',
  password = '',
}) {
  return request('/auth/register', {
    method: 'POST',
    body: {
      username,
      email,
      password,
    },
  });
}
export async function login({ loginAs = '', password = '' }) {
  return request('/auth/login', {
    method: 'POST',
    body: {
      loginAs,
      password,
    },
  });
}
