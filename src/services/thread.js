import request from 'utils/request';

export async function getThreads(page, channel) {
  return request('/threads', {
    params: { page, channel },
  });
}

export async function getThread(id) {
  return request(`/threads/${id}`);
}

export async function postThread({ channel, title, body }) {
  return request('/threads', {
    method: 'POST',
    body: {
      channel_id: channel,
      title,
      body,
    },
  });
}
