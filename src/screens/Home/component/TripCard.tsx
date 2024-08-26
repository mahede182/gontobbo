// src/screens/Home/component/TripCard.tsx
import React from "react";
import { Image, StyleSheet } from "react-native";
import { Box, RestyleText } from "@/theme";
import { colors } from "@/theme/colors";

interface TripCardProps {
  image: string;
  title: string;
  duration: string;
  feature: string;
  peopleJoined: number;
  avatars: string[];
}

const TripCard: React.FC<TripCardProps> = ({
  image,
  title,
  duration,
  feature,
  peopleJoined,
  avatars,
}) => (
  <Box flexDirection="row" marginBottom="large" backgroundColor="neutral100" borderRadius={10}>
    <Image source={image} style={styles.image} />
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
        <Box flexDirection="row" marginRight="small">
          {avatars.slice(0, 4).map((avatar, index) => (
            <Image
              key={index}
              source={avatar}
              style={[styles.avatar, { marginLeft: index > 0 ? -10 : 0 }]}
            />
          ))}
        </Box>
        <RestyleText variant="caption" color="gray">
          {peopleJoined}+ People Joined
        </RestyleText>
      </Box>
    </Box>
  </Box>
);

const styles = StyleSheet.create({
  image: {
    width: "40%",
    height: 100,
    borderRadius: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: colors.white100,
  },
});

export default TripCard;
