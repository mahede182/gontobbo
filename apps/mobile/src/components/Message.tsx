import { Message } from "@/@types/api.type";
import { colors } from "@/theme/colors";
import { fontSizes } from "@/theme/fontSizes";
import { typography } from "@/theme/typography";
import { MotiView, View } from "moti";
import { StyleSheet, Text } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";

export const MessageItem = ({ item, index }: { item: Message; index: number }) => {
  const isUser = item.sender === "user";
  return (
    <MotiView
      from={{ opacity: 0, translateX: isUser ? 50 : -50 }}
      animate={{ opacity: 1, translateX: 0 }}
      transition={{ type: "spring", damping: 15 }}
      style={[styles.messageWrapper, isUser ? styles.userMessageWrapper : styles.aiMessageWrapper]}>
      {!isUser && (
        <View style={styles.aiAvatar}>
          <Icon name="planet" size={16} color={colors.white} />
        </View>
      )}
      <View style={styles.messageContent}>
        {isUser ? (
          <LinearGradient
            colors={[colors.blue800, colors.blue600]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.bubble, styles.userBubble]}>
            <Text style={[styles.messageText, styles.userText]}>{item.text}</Text>
          </LinearGradient>
        ) : (
          <View style={[styles.bubble, styles.aiBubble]}>
            <Text style={[styles.messageText, styles.aiText]}>{item.text}</Text>
          </View>
        )}
        <Text style={[styles.timeText, isUser ? styles.timeTextRight : styles.timeTextLeft]}>
          {item.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
        </Text>
      </View>
    </MotiView>
  );
};

const styles = StyleSheet.create({
  messageWrapper: {
    marginBottom: 20,
    maxWidth: "85%",
    flexDirection: "row",
    alignItems: "flex-end",
  },
  userMessageWrapper: {
    alignSelf: "flex-end",
  },
  aiMessageWrapper: {
    alignSelf: "flex-start",
  },
  aiAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.blue800,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    marginBottom: 20,
  },
  messageContent: {
    flex: 1,
  },
  bubble: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  userBubble: {
    borderBottomRightRadius: 4,
  },
  aiBubble: {
    backgroundColor: colors.white,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontFamily: typography.poppinsRegular,
    fontSize: fontSizes.md,
    lineHeight: 22,
  },
  userText: {
    color: colors.white,
  },
  aiText: {
    color: colors.neutral700,
  },
  timeText: {
    fontFamily: typography.poppinsRegular,
    fontSize: fontSizes.xs,
    color: colors.neutral400,
    marginTop: 6,
    marginHorizontal: 4,
  },
  timeTextRight: {
    textAlign: "right",
  },
  timeTextLeft: {
    textAlign: "left",
  },
});
