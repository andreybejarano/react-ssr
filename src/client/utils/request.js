import { fetch } from 'whatwg-fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    var error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
}

function parseJSON(response) {
  return response.json();
}

export default (url, options = {}) => {
  options.credentials = 'include';
  options.mode = 'cors';
  options.cache = 'default';
  options.body = JSON.stringify(options.body);
  options.headers = {
    ...options.headers,
    'Content-Type': 'application/json'
  };

  return new Promise((resolve, reject) => {
    fetch(url, options)
      .then(checkStatus)
      .then(parseJSON)
      .then(response => resolve(response))
      .catch((error) => reject(error));
  });
};
