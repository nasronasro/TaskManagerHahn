export const BASE_URL = 'https://localhost:7240'; 
export const LOGIN_ENDPOINT = '/api/User';
export const PROJECTS_ENDPOINT = '/api/project';
export const TASKS_ENDPOINT = '/api/task'
// Basic validation
if (!BASE_URL || !LOGIN_ENDPOINT || !PROJECTS_ENDPOINT) {
    console.error('API configuration is missing essential strings!');
}

export const LOGIN_URL = `${BASE_URL}${LOGIN_ENDPOINT}`;
export const PROJECT_URL = `${BASE_URL}${PROJECTS_ENDPOINT}`;