
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const LOGIN_ENDPOINT = import.meta.env.VITE_LOGIN_ENDPOINT;

if (!BASE_URL || !LOGIN_ENDPOINT) {
    console.error('API configuration is missing environment variables!');
}

export const LOGIN_URL = `${BASE_URL}${LOGIN_ENDPOINT}`;