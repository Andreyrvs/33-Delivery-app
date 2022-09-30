import axios from 'axios';

const Content = 'application/json';

export function axiosPostLogin({ email, password }) {
  const result = axios({
    method: 'post',
    url: 'http://localhost:3001/login',
    data: {
      email,
      password,
    },
  })
    .then((response) => {
      console.log('resp', response);
      const { status } = response;
      const { token } = response.data;
      return { token, status };
    });
  return result;
}

export async function fetchPost(url, payLoad, token) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': Content,
      Authorization: token,
    },
    mode: 'cors',
    body: JSON.stringify(payLoad),
  });
  const { status } = response;
  const data = await response.json();
  return { data, status };
}

export const fetchUpdate = async (url, payload, token) => {
  const response = await fetch(url, {
    method: 'PATCH',
    headers: {
      'Content-Type': Content,
      Authorization: token,
    },
    mode: 'cors',
    body: JSON.stringify(payload),
  });
  const { status } = response;
  return status;
};

export const fetchDelete = async (url, token) => {
  const response = await fetch(url, {
    method: 'DELETE',
    headers: {
      'Content-Type': Content,
      Authorization: token,
    },
    mode: 'cors',
  });
  const { status } = response;
  return status;
};

export const fecthProducts = async () => {
  const URL = 'http://localhost:3001/customer/products';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchAllUsers = async () => {
  const URL = 'http://localhost:3001/user/get-all';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export const fetchAll = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};
