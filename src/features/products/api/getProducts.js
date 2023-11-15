import api from "../../../lib/axios";

export const getProducts = async () => {
  return await api.get("/products").then((response) => response.data);
};

export const getProductById = async (id) => {
  return await api.get(`/products/${id}`).then((response) => response.data);
};
