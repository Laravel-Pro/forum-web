import { provider } from 'services/pact-provider';
import { eachLike } from '@pact-foundation/pact/dsl/matchers';
import { setBaseURL } from 'utils/request';
import { getChannels } from './channel';

const EXPECTED_CHANNELS = eachLike({ id: 1, name: 'Help', slug: 'help' });

describe('channels', () => {
  beforeAll(async () => {
    await provider.setup();
    setBaseURL(provider.mockService.baseUrl);
  });

  afterEach(async () => {
    await provider.verify();
  });

  afterAll(async () => provider.finalize());

  it('channels exists', async () => {
    await provider.addInteraction({
      // state 定义 provider 状态
      state: 'channels exists',
      uponReceiving: 'get all channels',
      withRequest: {
        method: 'GET',
        path: '/channels',
        headers: { Accept: 'application/json' },
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: EXPECTED_CHANNELS,
      },
    });

    const data = await getChannels();
    expect(data).toBeInstanceOf(Array);
    expect(data).toHaveProperty([0, 'name']);
    expect(data).toHaveProperty([0, 'slug']);
  });

  it('no channels exists', async () => {
    await provider.addInteraction({
      // state 定义 provider 状态
      state: 'no channels exists',
      uponReceiving: 'get empty array',
      withRequest: {
        method: 'GET',
        path: '/channels',
        headers: { Accept: 'application/json' },
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: [],
      },
    });

    const data = await getChannels();
    expect(data).toEqual([]);
  });
});
