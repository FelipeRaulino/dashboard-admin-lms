import api from "../../../lib/axios";

export const getSales = async () => {
  return await api.get("/carts").then((response) => response.data);
};
