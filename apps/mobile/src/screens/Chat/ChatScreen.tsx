import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { DrawerActions, useNavigation, useRoute } from "@react-navigation/native";
import { MotiView, AnimatePresence } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import HeaderTitle from "@/components/HeaderTitle";
import { colors } from "@/theme/colors";
import { fontSizes } from "@/theme/fontSizes";
import { typography } from "@/theme/typography";
import { useSendChatMessageMutation } from "@/store/api/chatApi";
import Icon from "@expo/vector-icons/Ionicons";

// Interface for local message format
interface Message {
  id: string;
  text: string;
  sender: "user" | "ai";
  createdAt: Date;
}

const AI_USER_NAME = "Gontobbo AI";

const TypingIndicator = () => (
  <MotiView
    from={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ loop: true, type: "timing", duration: 600 }}
    style={styles.typingIndicator}>
    <View style={styles.dot} />
    <MotiView
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ loop: true, duration: 600, delay: 100 }}
      style={styles.dot}
    />
    <MotiView
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ loop: true, duration: 600, delay: 200 }}
      style={styles.dot}
    />
  </MotiView>
);

const ChatScreen: React.FC = (): JSX.Element => {
  const route = useRoute<any>();
  const initialMessage = route.params?.initialMessage;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [sendChat, { isLoading }] = useSendChatMessageMutation();
  const flatListRef = useRef<FlatList>(null);
  const hasProcessedInitial = useRef(false);

  // Welcome message
  useEffect(() => {
    setMessages([
      {
        id: "welcome",
        text: "Hi! I'm Gontobbo AI \nAsk me about hotels, trips, or flights and I'll help you find the best options!",
        sender: "ai",
        createdAt: new Date(),
      },
    ]);
  }, []);

  // Process initial message from HomeScreen
  useEffect(() => {
    if (initialMessage && !hasProcessedInitial.current) {
      hasProcessedInitial.current = true;
      handleSendMessage(initialMessage);
    }
  }, [initialMessage]);

  const handleSendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMsg: Message = {
        id: Date.now().toString(),
        text: text.trim(),
        sender: "user",
        createdAt: new Date(),
      };

      setMessages((prev) => [...prev, userMsg]);
      setInputText("");

      try {
        // Build history from messages
        const history = messages
          .filter((m) => m.id !== "welcome")
          .map((m) => ({
            role: m.sender === "user" ? "user" : "assistant",
            content: m.text,
          }));

        const reply = await sendChat({
          message: text.trim(),
          history,
        }).unwrap();

        const aiMsg: Message = {
          id: Date.now().toString() + "_ai",
          text: reply,
          sender: "ai",
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, aiMsg]);
      } catch (err) {
        const errorMsg: Message = {
          id: Date.now().toString() + "_err",
          text: "Sorry, I couldn't process that right now. Please try again.",
          sender: "ai",
          createdAt: new Date(),
        };
        setMessages((prev) => [...prev, errorMsg]);
      }
    },
    [messages, sendChat],
  );

  const renderMessageItem = ({ item, index }: { item: Message; index: number }) => {
    const isUser = item.sender === "user";
    return (
      <MotiView
        from={{ opacity: 0, translateX: isUser ? 50 : -50 }}
        animate={{ opacity: 1, translateX: 0 }}
        transition={{ type: "spring", damping: 15 }}
        style={[
          styles.messageWrapper,
          isUser ? styles.userMessageWrapper : styles.aiMessageWrapper,
        ]}>
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
          <Text style={[styles.timeText, isUser ? { textAlign: "right" } : { textAlign: "left" }]}>
            {item.createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </Text>
        </View>
      </MotiView>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderTitle title="Chat" />

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}>
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessageItem}
          contentContainerStyle={styles.listContent}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
        />

        {isLoading && (
          <View style={styles.loadingContainer}>
            <TypingIndicator />
            <Text style={styles.loadingText}>Gontobbo AI is thinking...</Text>
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Ask anything..."
            placeholderTextColor={colors.neutral400}
            value={inputText}
            onChangeText={setInputText}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            disabled={!inputText.trim() || isLoading}
            onPress={() => handleSendMessage(inputText)}>
            <Icon name="send" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral100,
  },
  flex: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 10,
  },
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
    shadowColor: "#000",
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.neutral200,
    paddingBottom: Platform.OS === "ios" ? 30 : 12,
  },
  input: {
    flex: 1,
    fontFamily: typography.poppinsRegular,
    fontSize: fontSizes.md,
    color: colors.neutral700,
    backgroundColor: colors.neutral100,

    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 100,
    // maxHeight: 120,
    // marginRight: 10,
  },
  sendButton: {
    backgroundColor: colors.blue800,
    width: 48,
    height: 48,
    borderRadius: 24,
    marginBottom: 100,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.blue800,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  sendButtonDisabled: {
    backgroundColor: colors.neutral300,
    shadowOpacity: 0,
    elevation: 0,
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  loadingText: {
    fontFamily: typography.poppinsRegular,
    fontSize: fontSizes.sm,
    color: colors.neutral500,
    marginLeft: 10,
  },
  typingIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.blue800,
    marginHorizontal: 2,
  },
});
