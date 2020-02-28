let baseURL = window ? window.location.href : '';

// for pact test
export function setBaseURL(url) {
  baseURL = url;
}

export default function request(url, options) {
  const defaultOptions = {};
  const newOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      Accept: 'application/json',
    },
  };
  if (newOptions.method === 'POST' || newOptions.method === 'PUT' || newOptions.method === 'DELETE') {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        'Content-Type': 'application/json; charset=utf-8',
        ...newOptions.headers,
      };
      newOptions.body = JSON.stringify(newOptions.body);
    } else {
      // newOptions.body is FormData
      newOptions.headers = {
        'Content-Type': 'multipart/form-data',
        ...newOptions.headers,
      };
    }
  }

  const resolvedUrl = (new URL(url, baseURL)).href;

  return fetch(resolvedUrl, newOptions)
    .then((response) => response.json())
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);
    });
}
