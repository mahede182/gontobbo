import axios from "axios";
import { AUTH_URL } from "@/constants/urls";
import { TUser } from "@/@types/auth.type";
import { getItem, saveItem } from "@/utils/storage";
import { STORAGE_KEYS } from "@/@types/storage.type";

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

export const saveUser = async (user: TUser) => {
  await saveItem(STORAGE_KEYS.USER, user);
};

export const getUserAsync = async () => {
  const user = await getItem(STORAGE_KEYS.USER);
  return user;
};
