import axios from "axios";

const baseUrl = "http://localhost:3002/persons";

const getAll = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const create = (personObject) => {
  return axios.post(baseUrl, personObject).then((response) => response.data);
};

const update = (id, personObject) => {
  return axios
    .put(`${baseUrl}/${id}`, personObject)
    .then((response) => response.data);
};

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, remove };
