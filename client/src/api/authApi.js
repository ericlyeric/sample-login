import axios from "axios";

export const login = async (user) => {
  return axios.post('/auth/login', user)
    .then(res => res.data)
    .catch(error => {
      return {
        isAuthenticated: false,
        user: { username: '', role: '' },
        message: {
          msgBody: `${error.statusText} ${error.status}`,
          msgError: true,
        },
      }
    })
};

export const register = async (user) => {
  return axios.post('/auth/register', user)
    .then(res => res.data)
};

export const logout = async () => {
  return axios.get('/auth/logout')
    .then(res => res.data);
}

export const isAuthenticated = async () => {
  return axios.get('/user/is-authenticated')
    .then(res => res.data)
    .catch(() => {
      return {
        isAuthenticated: false,
        user: {username: '', role: ''}
      }
    })
}