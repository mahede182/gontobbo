// src/screens/Home/component/TripCard.tsx
import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";
import { useNavigation } from "@react-navigation/native";

interface TripCardProps {
  id: string;
  image: string;
  title: string;
  duration: string;
  feature: string;
  peopleJoined: number;
}

const TripCard: React.FC<TripCardProps> = ({
  id,
  image,
  title,
  duration,
  feature,
  peopleJoined,
}) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("SEARCH_RESULT_DETAILS", { tripId: id });
      }}
      style={({ pressed }) => [
        {
          opacity: pressed ? 0.5 : 1,
          transform: [{ scale: pressed ? 0.95 : 1 }],
        },
      ]}>
      <Box flexDirection="row" marginBottom="large" backgroundColor="neutral100" borderRadius={10}>
        <Image
          source={image ? { uri: image } : require("@/assets/hotel_image_1.png")}
          style={styles.image}
        />

        <Box
          width="60%"
          paddingVertical="five"
          paddingHorizontal="medium"
          alignItems="flex-start"
          justifyContent="space-between">
          <RestyleText variant="subtitle" marginBottom="ten" paddingHorizontal="two">
            {title}
          </RestyleText>
          <Box flexDirection="row" alignItems="center" marginBottom="small">
            <RestyleText variant="caption" color="gray" marginRight="tiny">
              {duration}
            </RestyleText>
            <RestyleText variant="caption" color="gray">
              {feature}
            </RestyleText>
          </Box>
          <Box flexDirection="row" alignItems="center">
            <RestyleText variant="caption" color="gray">
              {peopleJoined}+ People Joined
            </RestyleText>
          </Box>
        </Box>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "40%",
    height: 100,
    borderRadius: 8,
  },
});

export default TripCard;
