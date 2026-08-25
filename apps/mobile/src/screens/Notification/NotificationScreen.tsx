import React from "react";
import { Text, StyleSheet, FlatList, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from "moti";
import HeaderTitle from "@/components/HeaderTitle";
import { colors } from "@/theme/colors";
import {
  useGetNotificationsQuery,
  useMarkAsReadMutation,
  useMarkAllAsReadMutation,
  type Notification,
} from "@/store/api/notificationsApi";
import { AppLogger } from "@/utils/applogger";

const NotificationScreen: React.FC = () => {
  const { data: notifData, isLoading: loading } = useGetNotificationsQuery();
  const notifications = (notifData?.data as any)?.notifications ?? [];
  const [markAsReadMutation] = useMarkAsReadMutation();
  const [markAllAsReadMutation] = useMarkAllAsReadMutation();

  const handleMarkAsRead = async (id: string) => {
    try {
      await markAsReadMutation(id).unwrap();
    } catch (error) {
      AppLogger.error("Error marking notification as read:", error);
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsReadMutation().unwrap();
    } catch (error) {
      AppLogger.error("Error marking all as read:", error);
    }
  };

  const formatTime = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const minutes = Math.floor(diff / 60000);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      onPress={() => !item.isRead && handleMarkAsRead(item.id)}
      style={[styles.notificationContainer, !item.isRead && styles.unreadNotification]}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      {item.body ? <Text style={styles.notificationBody}>{item.body}</Text> : null}
      <Text style={styles.notificationTime}>{formatTime(item.createdAt)}</Text>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={colors.primary700} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle title="Notification" />
      {notifications.some((n: any) => !n.isRead) && (
        <TouchableOpacity onPress={handleMarkAllAsRead} style={styles.markAllButton}>
          <Text style={styles.markAllText}>Mark all as read</Text>
        </TouchableOpacity>
      )}
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
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
  unreadNotification: {
    backgroundColor: colors.white200,
    borderLeftWidth: 3,
    borderLeftColor: colors.primary700,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  notificationBody: {
    fontSize: 14,
    color: colors.neutral600,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: colors.neutral600,
  },
  markAllButton: {
    alignSelf: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  markAllText: {
    color: colors.primary700,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default NotificationScreen;
