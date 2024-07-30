import React, { useEffect, useState } from "react";
import { Box, RestyleText } from "@/theme";
import { fetchUser } from "@/utils/axios";
import "@/machine/counterMachine";
import Icon from "@expo/vector-icons/Ionicons";
import { colors } from "@/theme/colors";
import { useTheme } from "@shopify/restyle";
import { Theme } from "@/@types/theme.type";
import { Image, TextInput } from "react-native";
import { Input } from "@/components/Input";
import FeaturedHotels from "./component/HotelCard";
import PopularTrip from "./component/TripCard";

type Props = {};

const HomeScreen: React.FC<Props> = (props: Props): JSX.Element => {
  // const { t } = useTranslation();
  // const navigation = useNavigation();
  // const [state] = useMachine(toggleMachine);
  const { images } = useTheme<Theme>();
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
    <Box paddingHorizontal={"ten"}>
      {/* === drawer button === */}
      <Box flexDirection="row" justifyContent="space-between">
        <Image
          source={images.menuBtn}
          style={{ height: 60, width: 60, resizeMode: "cover" }}
        />
        <Image
          source={images.notifiocationBtn}
          style={{ height: 60, width: 60 }}
        />
      </Box>
      {/* === ai section === */}
      <Box paddingHorizontal={"ten"}>
        <Box
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"flex-start"}
          marginVertical="ten"
        >
          <Image source={images.magicAiBtn} />
          <RestyleText>ASK AI</RestyleText>
        </Box>
        <Input
          icon="search-outline"
          placeholder="Ask me anything you're searching for"
        />
      </Box>
      {/* === Hotel card section === */}
      <FeaturedHotels />
      {/* === trip card === */}
      <PopularTrip />
    </Box>
  );
};

export default HomeScreen;
