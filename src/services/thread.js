import request from 'utils/request';

export async function getThreads(channel) {
  return request('/threads', {
    params: { channel },
  });
}
