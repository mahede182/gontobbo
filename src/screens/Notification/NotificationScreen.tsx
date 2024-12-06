import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { SafeAreaView } from "moti";
import HeaderTitle from "@/components/HeaderTitle";
import { colors } from "@/theme/colors";

// Sample notification data
const notifications = [
  { id: 1, title: "New message from John", time: "2 hours ago" },
  { id: 2, title: "Your order has been shipped", time: "1 day ago" },
  { id: 3, title: "Upcoming event reminder", time: "3 days ago" },
  { id: 4, title: "App update available", time: "1 week ago" },
  { id: 5, title: "New message from John", time: "2 hours ago" },
  { id: 5, title: "Your order has been shipped", time: "1 day ago" },
  { id: 7, title: "Upcoming event reminder", time: "3 days ago" },
  { id: 8, title: "App update available", time: "1 week ago" },
  { id: 9, title: "App update available", time: "1 week ago" },
];

const NotificationScreen: React.FC = () => {
  const renderNotification = ({ item }: { item: (typeof notifications)[number] }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle title="Notification" />
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
  },
  listContainer: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  notificationContainer: {
    backgroundColor: colors.secondary100,
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 14,
    color: colors.neutral600,
  },
});

export default NotificationScreen;
