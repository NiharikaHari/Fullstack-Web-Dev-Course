import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (data) => {
  const request = axios.post(baseUrl, data);
  return request.then((response) => response.data);
};

const update = (updatedData) => {
  const request = axios.put(`${baseUrl}/${updatedData.id}`, updatedData);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default { getAll, create, update, remove };
