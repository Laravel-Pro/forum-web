import request from 'utils/request';

describe('request', () => {
  it('should parse json response body', async () => {
    const response = new Response('{"foo":"bar"}');
    response.headers.set('Content-Type', 'application/json');
    global.fetch = jest.fn().mockImplementation(() => Promise.resolve(response));

    const data = await request('/');

    expect(data).toHaveProperty('foo', 'bar');
  });

  it('should stringify as json when request body is not FormData', async () => {
    const body = { foo: 'bar' };
    global.fetch = jest.fn().mockImplementation(async (url, options) => {
      expect(options.body).toBe(JSON.stringify(body));
      return new Response(JSON.stringify(body));
    });

    await request('/', {
      method: 'POST',
      body,
    });
  });
});
