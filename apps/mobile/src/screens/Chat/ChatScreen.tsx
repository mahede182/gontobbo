import React, { useCallback, useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Platform,
  FlatList,
  TextInput,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import HeaderTitle from "@/components/HeaderTitle";
import { colors } from "@/theme/colors";
import { fontSizes } from "@/theme/fontSizes";
import { typography } from "@/theme/typography";
import { useSendChatMessageMutation } from "@/store/api/chatApi";
import Icon from "@expo/vector-icons/Ionicons";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { TypingIndicator } from "@/components/Typing";
import { Message } from "@/@types/api.type";
import { MessageItem } from "@/components/Message";
import Background from "@/components/Background";

const ChatScreen: React.FC = (): JSX.Element => {
  const route = useRoute<any>();
  const initialMessage = route.params?.initialMessage;
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [sendChat, { isLoading }] = useSendChatMessageMutation();
  const flatListRef = useRef<FlatList>(null);
  const hasProcessedInitial = useRef(false);

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
      } catch {
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

  // Process initial message from HomeScreen
  useEffect(() => {
    if (initialMessage && !hasProcessedInitial.current) {
      hasProcessedInitial.current = true;
      handleSendMessage(initialMessage);
    }
  }, [initialMessage, handleSendMessage]);

  return (
    <Background>
      <HeaderTitle title="Chat" />
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item, index }) => <MessageItem item={item} index={index} />}
        contentContainerStyle={styles.listContent}
        onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        onLayout={() => flatListRef.current?.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={false}
      />
      <KeyboardStickyView offset={{ closed: 0, opened: 40 }}>
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
      </KeyboardStickyView>
    </Background>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 10,
  },
  inputContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.neutral200,
    paddingBottom: Platform.OS === "ios" ? 30 : 12,
    marginBottom: 50,
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
    // marginBottom: 100,
    // maxHeight: 120,
    // marginRight: 10,
  },
  sendButton: {
    backgroundColor: colors.blue800,
    width: 48,
    height: 48,
    borderRadius: 24,
    // marginBottom: 100,
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
});
