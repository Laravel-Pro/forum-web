import request from 'utils/request';

export async function getReplies(threadId, page) {
  return request(`/threads/${threadId}/replies`, {
    params: { page },
  });
}

export async function postReply(body, threadId) {
  return request(`/threads/${threadId}/replies`, {
    method: 'POST',
    body: {
      body,
    },
  });
}
