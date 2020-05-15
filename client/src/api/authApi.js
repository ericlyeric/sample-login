export const login = async (user) => {
  return fetch('/auth/login', {
    method: 'post',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.status !== 401 && res.status !== 400) {
      return res.json().then((data) => data);
    } else {
      return {
        isAuthenticated: false,
        user: { username: '', role: '' },
        message: {
          msgBody: `${res.statusText} ${res.status}`,
          msgError: true,
        },
      };
    }
  });
};

export const register = async (user) => {
  return fetch('/auth/register', {
    method: 'post',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((data) => data);
};

export const logout = async () => {
  return fetch('/auth/logout')
    .then((res) => res.json())
    .then((data) => data);
};

export const isAuthenticated = async () => {
  return fetch('/user/is-authenticated').then((res) => {
    if (res.status !== 401) {
      return res.json().then((data) => data);
    } else {
      return {
        isAuthenticated: false,
        user: { username: '', role: '' },
      };
    }
  });
};
