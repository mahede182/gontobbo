import React from "react";
import { Image, ScrollView, StyleSheet } from "react-native";
import { Box, RestyleText, Theme } from "@/theme";
import { images } from "@/theme/images";

interface TripCardProps {
  image: string;
  title: string;
  dateRange: string;
  peopleJoined: number;
  avatars: string[];
}

const TripCard: React.FC<TripCardProps> = ({
  image,
  title,
  dateRange,
  peopleJoined,
  avatars,
}) => (
  <Box marginBottom="large">
    <Image source={image} style={styles.image} />
    <Box
      position="absolute"
      bottom={0}
      left={0}
      right={0}
      padding="medium"
      backgroundColor="white"
    >
      <RestyleText variant="h2" marginBottom="tiny">
        {title}
      </RestyleText>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <RestyleText variant="caption" color="gray">
          {dateRange}
        </RestyleText>
        <Box flexDirection="row" alignItems="center">
          <Box flexDirection="row" marginRight="small">
            {avatars.slice(0, 4).map((avatar, index) => (
              <Image
                key={index}
                source={{ uri: avatar }}
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
  </Box>
);

const PopularTrip: React.FC = () => (
  <Box>
    <RestyleText
      variant="h2"
      style={{ marginVertical: 10, paddingHorizontal: 15 }}
    >
      Popular Tip
    </RestyleText>
    <ScrollView style={{ paddingHorizontal: 20 }}>
      <TripCard
        image={images.dummyTrip}
        title="Buckingham Palace, London"
        dateRange="30 Aug - 15 Sep"
        peopleJoined={7}
        avatars={[
          "https://example.com/avatar1.jpg",
          "https://example.com/avatar2.jpg",
          "https://example.com/avatar3.jpg",
          "https://example.com/avatar4.jpg",
        ]}
      />
      <TripCard
        image={images.dummyTrip}
        title="Acropolis of Athens"
        dateRange="19 Nov - 10 Dec"
        peopleJoined={14}
        avatars={[
          "https://example.com/avatar5.jpg",
          "https://example.com/avatar6.jpg",
          "https://example.com/avatar7.jpg",
          "https://example.com/avatar8.jpg",
        ]}
      />
      <TripCard
        image={images.dummyTrip}
        title="Acropolis of Athens"
        dateRange="19 Nov - 10 Dec"
        peopleJoined={14}
        avatars={[
          "https://example.com/avatar5.jpg",
          "https://example.com/avatar6.jpg",
          "https://example.com/avatar7.jpg",
          "https://example.com/avatar8.jpg",
        ]}
      />
      <TripCard
        image={images.dummyTrip}
        title="Acropolis of Athens"
        dateRange="19 Nov - 10 Dec"
        peopleJoined={14}
        avatars={[
          "https://example.com/avatar5.jpg",
          "https://example.com/avatar6.jpg",
          "https://example.com/avatar7.jpg",
          "https://example.com/avatar8.jpg",
        ]}
      />
      <TripCard
        image={images.dummyTrip}
        title="Acropolis of Athens"
        dateRange="19 Nov - 10 Dec"
        peopleJoined={14}
        avatars={[
          "https://example.com/avatar5.jpg",
          "https://example.com/avatar6.jpg",
          "https://example.com/avatar7.jpg",
          "https://example.com/avatar8.jpg",
        ]}
      />
    </ScrollView>
  </Box>
);

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "white",
  },
});

export default PopularTrip;
