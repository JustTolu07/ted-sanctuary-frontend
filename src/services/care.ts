import { api } from "../api/client";

export async function getCare() {
  const { data } = await api.get("/care");
  return data;
}