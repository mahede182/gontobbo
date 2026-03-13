import React from "react";
import { APP_INITIALIZED } from "@/constants/config";
import { getItem } from "@/utils/storage";

export const useIntroShown = () => {
  const [showIntro, setShowIntro] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchIntroShown = async () => {
      const existing = await getItem(APP_INITIALIZED);
      setShowIntro(!existing);
    };

    fetchIntroShown();
  }, []);

  return showIntro;
};
