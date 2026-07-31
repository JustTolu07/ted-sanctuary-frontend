import { api } from "../api/client";

export async function getHome() {
  const { data } = await api.get("/home");
  return data;
}