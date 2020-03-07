import request from 'utils/request';

export async function registerUser({ username = '', email = '', password = '' }) {
  return request('/auth/register', {
    method: 'POST',
    body: {
      username,
      email,
      password,
    },
  });
}
