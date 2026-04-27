export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:8080';

type ApiFetchInit = RequestInit & {
  skipAuthRefresh?: boolean;
};

let refreshRequest: Promise<boolean> | null = null;

function getRequestUrl(input: RequestInfo | URL) {
  if (typeof input === 'string') {
    return input;
  }

  if (input instanceof URL) {
    return input.toString();
  }

  return input.url;
}

function shouldSkipAuthRefresh(input: RequestInfo | URL, init?: ApiFetchInit) {
  if (init?.skipAuthRefresh) {
    return true;
  }

  const url = getRequestUrl(input);

  return url.includes('/api/v1/auth/refresh');
}

async function refreshAuthSession() {
  if (!refreshRequest) {
    refreshRequest = fetch(`${API_BASE_URL}/api/v1/auth/refresh`, {
      method: 'POST',
      credentials: 'include',
    })
      .then((response) => response.ok)
      .catch(() => false)
      .finally(() => {
        refreshRequest = null;
      });
  }

  return refreshRequest;
}

function withCredentials(init?: ApiFetchInit): RequestInit {
  const requestInit = { ...init };
  delete requestInit.skipAuthRefresh;

  return {
    ...requestInit,
    credentials: requestInit.credentials ?? 'include',
  };
}

export async function apiFetch(input: RequestInfo | URL, init?: ApiFetchInit) {
  const requestInit = withCredentials(init);
  const response = await fetch(input, requestInit);

  if (response.status !== 401 || shouldSkipAuthRefresh(input, init)) {
    return response;
  }

  const refreshed = await refreshAuthSession();

  if (!refreshed) {
    return response;
  }

  return fetch(input, requestInit);
}
