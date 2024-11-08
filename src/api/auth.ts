import axios from "axios";
import { AUTH_URL } from "@/constants/urls";
import { TUser } from "@/@types/auth.type";

export const signIn = async (user: string, password: string): Promise<TUser> => {
  const response = await axios.post(`${AUTH_URL}/login`, {
    username: user,
    password: password,
    expiresInMins: 30,
  });
  return { status: "success", user: response.data };
};

export const getUser = async (accessToken: string): Promise<TUser> => {
  try {
    const response = await axios.get(`${AUTH_URL}/me`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      withCredentials: true,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
