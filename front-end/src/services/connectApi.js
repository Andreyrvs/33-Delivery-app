import axios from 'axios';

/*
const fecthUsers = async () => {
  const URL = '';
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default fecthUsers;
*/

export default function axiosPostLogin({ email, password }) {
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

export async function fetchPost(url, { email, password }) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    mode: 'cors',
    body: JSON.stringify({
      email,
      password,
    }),
  });
  const { status } = response;
  const data = await response.json();
  return { data, status };
}
