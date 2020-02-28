import request from 'utils/request';

export async function getChannels() {
  return request('/channels');
}
