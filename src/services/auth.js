import request from 'utils/request';

export async function registryUser({ username = '', email = '', password = '' }) {
  return request('/auth/register', {
    method: 'POST',
    body: {
      username,
      email,
      password,
    },
  });
}
