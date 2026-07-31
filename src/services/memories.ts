import { api } from "../api/client";

export async function getMemories() {
  const { data } = await api.get("/memories");
  return data;
}