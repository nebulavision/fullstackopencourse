import axios from "axios";

const REST_URL = "/api/persons";

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

const updateNumber = (id, newNumber) => {
  return axios
    .put(`${REST_URL}/${id}`, newNumber)
    .then((response) => response.data);
};

const deleteNumber = (id) => {
  return axios
    .delete(`${REST_URL}/${id}`)
    .then((response) => response.data);
};

export default { getAll, insertNumber, updateNumber, deleteNumber };