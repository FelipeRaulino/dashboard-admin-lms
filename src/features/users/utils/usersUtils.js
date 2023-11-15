import { getUsers } from "../api/getUsers";

export const getUserTotals = async () => {
  const allUsers = await getUsers();

  return allUsers.length;
};
