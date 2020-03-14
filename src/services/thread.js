import request from 'utils/request';

export async function getThreads(page, channel) {
  return request('/threads', {
    params: { page, channel },
  });
}
