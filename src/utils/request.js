let baseURL = window ? `${window.location.origin}/api` : '';

// for pact test
export function setBaseURL(url) {
  baseURL = url;
}

function combineURLs(base, relative) {
  return relative
    ? `${base.replace(/\/+$/, '')}/${relative.replace(/^\/+/, '')}`
    : baseURL;
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

  const resolvedUrl = combineURLs(baseURL, url);

  return fetch(resolvedUrl, newOptions)
    .then((response) => response.json())
    .catch((e) => {
      // eslint-disable-next-line no-console
      console.error(e);
    });
}
