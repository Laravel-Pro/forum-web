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

export default async function request(url, options) {
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

  const resp = await fetch(resolvedUrl, newOptions);

  let content;

  const contentType = resp.headers.get('Content-Type');
  if (contentType) {
    if (contentType.indexOf('json') !== -1) {
      content = await resp.json();
    } else if (contentType.indexOf('text') !== -1) {
      content = await resp.text();
    } else {
      content = await resp.blob();
    }
  }

  if (!resp.ok) {
    throw resp;
  }

  return content;
}
