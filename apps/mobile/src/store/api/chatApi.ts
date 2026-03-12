import { apiSlice } from "../slices/apiSlice";
import { CHAT_AI } from "@/constants/urls";

type ChatRequest = {
  message: string;
  history?: { role: string; content: string }[];
};

type ChatResponse = {
  success: boolean;
  data: { reply: string };
};

export const chatApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    sendChatMessage: builder.mutation<string, ChatRequest>({
      query: (body) => ({
        url: CHAT_AI,
        method: "POST",
        body,
      }),
      transformResponse: (response: ChatResponse) => response.data.reply,
    }),
  }),
});

export const { useSendChatMessageMutation } = chatApi;
