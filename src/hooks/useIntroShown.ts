import React from "react";
import { INTRO_SHOWN } from "@/constants/config";
import { getItem, saveItem } from "@/utils/storage";

export const useIntroShown = (props: Props) => {
  const [showIntro, setShowIntro] = React.useState<boolean>(false);

  React.useEffect(() => {
    const fetchIntroShown = async () => {
      const existing = await getItem(INTRO_SHOWN);
      if (existing) {
        setShowIntro(true);
      } else {
        await saveItem(INTRO_SHOWN, "true");
        setShowIntro(false);
      }
    };

    fetchIntroShown();
  }, []);

  return { showIntro };
};
