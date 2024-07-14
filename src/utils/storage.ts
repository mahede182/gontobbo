import AsyncStorage from "@react-native-async-storage/async-storage";

export const getItem = async (key: string) => {
  if (!key) {
    return Promise.reject("Invalid key");
  }
  return await AsyncStorage.getItem(key);
};

export const saveItem = async (key: "string", value: string) => {
  if (!key || !value) {
    return Promise.reject("Invalid key or value");
  }

  return await AsyncStorage.setItem(key, value);
};
