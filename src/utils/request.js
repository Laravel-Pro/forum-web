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

function buildURL(url, params) {
  if (!params) {
    return url;
  }

  let serializedParams = '';
  if (params instanceof URLSearchParams) {
    serializedParams = params.toString();
  } else {
    const parts = [];
    Object.keys(params).forEach((key) => {
      let val = params[key];
      if (val === null || typeof val === 'undefined') {
        return;
      }
      if (val instanceof Date) {
        val = val.toISOString();
      } else if (val instanceof Object) {
        val = JSON.stringify(val);
      }
      parts.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
    });
    if (parts.length === 0) {
      return url;
    }
    serializedParams = parts.join('&');
  }
  return url + (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
}

function convertPagination(meta) {
  const { per_page: perPage, current_page: currentPage, total } = meta;
  return { perPage, currentPage, total };
}

export default async function request(url, options) {
  const defaultOptions = {
    credentials: 'include',
  };
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

  const resolvedUrl = combineURLs(baseURL, buildURL(url, newOptions.params));

  const resp = await fetch(resolvedUrl, newOptions);

  let content;

  const contentType = resp.headers.get('Content-Type');
  if (contentType) {
    if (contentType.indexOf('json') !== -1) {
      content = await resp.json();
      const { meta } = content;
      if (meta) {
        content.pagination = convertPagination(meta);
      }
    } else if (contentType.indexOf('text') !== -1) {
      content = await resp.text();
    } else {
      content = await resp.blob();
    }
  }

  if (!resp.ok) {
    // eslint-disable-next-line no-throw-literal
    throw { body: content, status: resp.status, response: resp };
  }

  return content;
}
