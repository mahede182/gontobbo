import React, { useState, useEffect } from "react";
import { getItem, saveItem } from "@/utils/storage";
import { APP_INITIALIZED } from "@/constants/config";

export const useAppInitialized = () => {
  const [isAppInitialized, setIsAppInitialized] = useState(false);

  useEffect(() => {
    const checkAppInitialized = async () => {
      try {
        const value = await getItem(APP_INITIALIZED);
        setIsAppInitialized(value !== null);
      } catch (error) {
        console.error("Error retrieving app initialized value:", error);
      }
    };

    checkAppInitialized();
  }, []);

  const setAppInitialized = async () => {
    try {
      await saveItem(APP_INITIALIZED, "true");
      setIsAppInitialized(true);
    } catch (error) {
      console.error("Error saving app initialized value:", error);
    }
  };

  return { isAppInitialized, setAppInitialized };
};
