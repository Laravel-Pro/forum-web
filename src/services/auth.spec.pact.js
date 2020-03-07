import { provider } from 'services/pact-provider';
import {
  like, extractPayload, email, eachLike,
} from '@pact-foundation/pact/dsl/matchers';
import { setBaseURL } from 'utils/request';
import { registerUser } from './auth';

const testUsername = 'aUser';
const testEmail = 'a-user@laravel.pro';
const testPassword = 'secret-password';

const userData = like({ username: testUsername, email: email(testEmail), password: testPassword });
const registryResult = { id: like(1), username: testUsername, email: email(testEmail) };

describe('auth', () => {
  beforeAll(async () => {
    await provider.setup();
    setBaseURL(provider.mockService.baseUrl);
  });

  afterEach(async () => {
    await provider.verify();
  });

  afterAll(async () => provider.finalize());

  it('username and email can be used', async () => {
    await provider.addInteraction({
      state: 'username and email can be used',
      uponReceiving: 'user info after registry',
      withRequest: {
        method: 'POST',
        path: '/auth/register',
        headers: { Accept: 'application/json' },
        body: userData,
      },
      willRespondWith: {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: registryResult,
      },
    });

    const userInfo = await registerUser(extractPayload(userData));
    expect(userInfo).toMatchObject(extractPayload(registryResult));
    expect(userInfo).toHaveProperty('id');
    expect(userInfo).toHaveProperty('username');
    expect(userInfo).toHaveProperty('email');
  });

  it(`username "${testUsername}" already exists`, async () => {
    await provider.addInteraction({
      state: `username "${testUsername}" already exists`,
      uponReceiving: 'exception of username already exists',
      withRequest: {
        method: 'POST',
        path: '/auth/register',
        headers: { Accept: 'application/json' },
        body: userData,
      },
      willRespondWith: {
        status: 422,
        headers: { 'Content-Type': 'application/json' },
        body: {
          message: like('The given data was invalid.'),
          errors: {
            username: eachLike(['The username has already been taken.']),
          },
        },
      },
    });

    const response = await registerUser(extractPayload(userData));
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty(['errors', 'username']);
  });

  it('password "secret" already exists', async () => {
    await provider.addInteraction({
      state: `email "${testEmail}" already exists`,
      uponReceiving: 'exception of email already exists',
      withRequest: {
        method: 'POST',
        path: '/auth/register',
        headers: { Accept: 'application/json' },
        body: userData,
      },
      willRespondWith: {
        status: 422,
        headers: { 'Content-Type': 'application/json' },
        body: {
          message: like('The given data was invalid.'),
          errors: {
            email: eachLike(['The email has already been taken.']),
          },
        },
      },
    });

    const response = await registerUser(extractPayload(userData));
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty(['errors', 'email']);
  });

  it('registration information is invalid', async () => {
    await provider.addInteraction({
      state: 'registration information is invalid',
      uponReceiving: 'The given data was invalid',
      withRequest: {
        method: 'POST',
        path: '/auth/register',
        headers: { Accept: 'application/json' },
        body: like({
          username: '', // no username input
          email: 'this-is-a-email', // invalid email
          password: 'secret', // too short
        }),
      },
      willRespondWith: {
        status: 422,
        headers: { 'Content-Type': 'application/json' },
        body: {
          message: like('The given data was invalid.'),
          errors: {
            username: eachLike(['The username field is required.']),
            email: eachLike(['The email must be a valid email address.']),
            password: eachLike(['The password must be at least 8 characters.']),
          },
        },
      },
    });

    const response = await registerUser(extractPayload(userData));
    expect(response).toHaveProperty('message');
    expect(response).toHaveProperty(['errors', 'username']);
    expect(response).toHaveProperty(['errors', 'email']);
    expect(response).toHaveProperty(['errors', 'password']);
  });
});
