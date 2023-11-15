import api from "../../../lib/axios";

export const getUsers = async () => {
  return await api.get("/users").then((response) => response.data);
};

export const getUserById = async (id) => {
  return await api.get(`/users/${id}`).then((response) => response.data);
};
