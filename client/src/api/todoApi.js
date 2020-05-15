export const getTodos = async () => {
  return fetch('/todo/all').then((res) => {
    if (res.status !== 401) {
      return res.json().then((data) => data);
    } else {
      return { message: { msgBody: 'Unauthorized', msgError: true } };
    }
  });
};

export const postTodo = async (todo) => {
  return fetch('/todo', {
    method: 'post',
    body: JSON.stringify(todo),
    headers: {
      'Content-Type': 'application/json',
    },
  }).then((res) => {
    if (res.status !== 401) {
      return res.json().then((data) => data);
    } else {
      return { message: { msgBody: 'Unauthorized', msgError: true } };
    }
  });
};
