import { api } from "../api/client";

export async function getTed() {
  const { data } = await api.get("/home");
  return data.ted;
}