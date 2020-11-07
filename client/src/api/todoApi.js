import axios from 'axios';

export const getTodos = async () => {
  return axios.get('/todo/all')
    .then(res => {
      return res.data;
    }).catch(() => {
      return { message: { msgBody: 'Unauthorized', msgError: true } };
    })
};

export const postTodo = async (todo) => {
  return axios.post('/todo', todo)
    .then(res => res.data)
    .catch(() => {
      return { message: {msgBody: 'Unauthorized', msgError: true}};
    })
}
