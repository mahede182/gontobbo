/* eslint-disable no-console */
import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async (key: string) => {
  try {
    const res = await AsyncStorage.getItem(key);
    if (!res) return "";
    return JSON.parse(res);
  } catch (e) {
    console.log("ERROR: Cannot get item from asyncStorage", e);
  }
};

export const saveItem = async (key: "string", value: string) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.log("ERROR: Cannot store item in asyncStorage", e);
  }
};

export const multiGetAsyncStore = async (keyList: [], callback: (arg0: string | null) => void) => {
  await AsyncStorage.multiGet(keyList).then((data) => {
    callback(JSON.parse(data));
  });
};

/**
 * Burn it all to the ground.
 */
export async function clear(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch {}
}
