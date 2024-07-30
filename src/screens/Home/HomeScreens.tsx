import React, { useEffect, useState } from "react";
import { Box } from "@/theme";
import { fetchUser } from "@/utils/axios";
import "@/machine/counterMachine";
import Icon from "@expo/vector-icons/Ionicons";
import { colors } from "@/theme/colors";

type Props = {};

const HomeScreens: React.FC<Props> = (props: Props): JSX.Element => {
  // const { t } = useTranslation();
  // const navigation = useNavigation();
  // const [state] = useMachine(toggleMachine);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  useEffect(() => {
    fetchUser().then((response) => {
      const data = response.data.data;
      setName(`${data?.first_name} ${data?.last_name}`);
      setEmail(data?.email);
      setImageUrl(data?.avatar);
    });
  }, [name, email, imageUrl]);

  return (
    <Box padding="twenty" flexDirection="row" justifyContent="space-between">
      <Icon name="menu" size={24} color={colors.black} />
      <Icon name="notifications" size={24} color={colors.black} />
    </Box>
  );
};

export default HomeScreens;
