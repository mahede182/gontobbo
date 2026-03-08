import React from "react";
import { INTRO_SHOWN } from "@/constants/config";
import { getItem } from "@/utils/storage";

export const useIntroShown = () => {
  const [showIntro, setShowIntro] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchIntroShown = async () => {
      const existing = await getItem(INTRO_SHOWN);
      setShowIntro(!existing);
    };

    fetchIntroShown();
  }, []);

  return showIntro;
};
