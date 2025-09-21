import axios from 'axios'

const BASE_URL = 'http://localhost:3001/api/v1/notes'

const getAll = () => {
  return axios.get(BASE_URL).then(res => res.data);
}

const create = newObject => {
  return axios.post(BASE_URL, newObject).then(res => res.data);
}

const update = (id, newObject) => {
  return axios.put(`${BASE_URL}/${id}`, newObject).then(res => res.data);
}

export default { getAll, create, update }