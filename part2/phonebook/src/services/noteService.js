import axios from "axios";

const REST_URL = "http://localhost:3001/persons";

const getAll = () => {
  return axios
    .get(REST_URL)
    .then((response) => response.data);
}

const insertNumber = (number) => {
  return axios
    .post(REST_URL, number)
    .then((response) => response.data);
      
};

const deleteNumber = (id) => {
  return axios
    .delete(`${REST_URL}/${id}`)
    .then((response) => response.data);
};

export default { getAll, insertNumber, deleteNumber };