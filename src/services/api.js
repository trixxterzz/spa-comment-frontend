import axios from 'axios';
import addAlert from '../utils/addAlert';
import { clearCookies } from '../utils/cookies';

export class HttpError extends Error {
    constructor(message, code = 400) {
      super(message);
  
      this.code = code;
    }
  }

export const api = axios.create({
    baseURL: import.meta.env.VITE_API,
    withCredentials: true,
    headers: {
      'Content-Type': 'application/json',
    },
});

const handleResponseError = (error) => {
    const { response: { data: { message, statusCode: status } = {} } = {} } = error;
    console.error(error);
  
    message !== 'Invalid tokens' && addAlert(message);

    if (message === 'Invalid tokens') {
      clearCookies();
    }
  
    throw new HttpError(message || 'Something went wrong', status);
};

api.interceptors.response.use(
  (res) => res?.data,
  handleResponseError
);