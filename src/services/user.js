import request from 'utils/request';

export async function getSelf() {
  return request('/user/self');
}
