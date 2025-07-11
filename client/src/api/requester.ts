import type { DataRequesterInterface } from '../interfaces/api';
import { getAccessToken } from '../utils/authUtils';

export const settings = {
  host: 'http://localhost:5000',
};

export const adminId = '668cfe59f18d95a1f2f52a13';

async function request(url: string, options: RequestInit) {

  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return;
    }

    if (response.ok == false) {
      if (response.status == 401) {
        localStorage.removeItem('auth');
      }

      const error = await response.json();

      if (typeof error.message === 'string') {
        throw new Error(error.message);
      } else {
        throw new Error(JSON.stringify(error.message));
      }
    }

    try {
      const data = await response.json();
      return data;
    } catch (err) {
      return response;
    }
  } catch (error: any) {
    throw new Error(error.message);
  }
}

function getOptions(method: string, body?: DataRequesterInterface): RequestInit {
  const options: RequestInit = {
    method,
    headers: {},
  };

  const requestHeaders: HeadersInit = new Headers();
  const accessToken = getAccessToken();

  if (accessToken) {
    requestHeaders.set('X-Authorization', accessToken);
  }

  if (body) {
    requestHeaders.set('Content-Type', 'application/json');
    options.body = JSON.stringify(body);
  }

  options.headers = requestHeaders;

  return options;
}

export async function get(url: string) {
  return await request(url, getOptions('get'));
}

export async function post(url: string, data: DataRequesterInterface) {
  return await request(url, getOptions('post', data));
}

export async function put(url: string, data: DataRequesterInterface) {
  return await request(url, getOptions('put', data));
}

export async function del(url: string) {
  return await request(url, getOptions('delete'));
}

export async function login(email: string, password: string) {
  const result = await post(settings.host + '/users/login', {
    email,
    password,
  });

  return result;
}

export async function register(email: string, password: string) {
  const result = await post(settings.host + '/users/register', {
    email,
    password,
  });

  return result;
}

export async function logout() {
  const result = await get(settings.host + '/users/logout');

  return result;
}
