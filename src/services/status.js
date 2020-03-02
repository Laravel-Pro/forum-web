import request from 'utils/request';

export async function getVersion() {
  return request('/status/version');
}

export async function getDBStatus() {
  return request('/status/db');
}
