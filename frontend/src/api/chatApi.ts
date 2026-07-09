import type { MemberRoleType } from "../constants/app/appConstants";
import { DEFAULT_MESSAGES_PAGE_SIZE } from "../constants/defaults";
import apiRoutes from "../constants/routes/apiRoutes";
import type { UserChatPreference } from "../types/chat";
import api from "./index";

const chatApi = {
  getChatPreference: async (
    chatId: number
  ): Promise<UserChatPreference> => {
    const res = await api.get(
      apiRoutes.chat.preference(chatId)
    );

    return res.data;
  },

  updateChatPreference: async (
    chatId: number,
    request: UserChatPreference
  ): Promise<UserChatPreference> => {
    const res = await api.patch(
      apiRoutes.chat.preference(chatId),
      request
    );

    return res.data;
  },

  getOrCreateDirectChat: async (
    targetUserId: number
  ) => {
    const res = await api.post(
      apiRoutes.chat.direct,
      {
        targetUserId,
      }
    );

    return res.data;
  },

  getMyChats: async () => {
    const res = await api.get(apiRoutes.chat.base);

    return res.data;
  },

  getChatById: async (chatId: number) => {
    const res = await api.get(
      `${apiRoutes.chat.base}/${chatId}`
    );

    return res.data;
  },

  sendMessage: async (
    chatId: number,
    content: string,
    contentType: string = "text",
    parentId?: number
  ) => {
    const res = await api.post(
      apiRoutes.chat.messages(chatId),
      {
        content,
        contentType,
        parentId,
      }
    );

    return res.data;
  },

  getMessages: async (
    chatId: number,
    beforeId?: number,
    pageSize: number = DEFAULT_MESSAGES_PAGE_SIZE
  ) => {
    const res = await api.get(
      apiRoutes.chat.messages(chatId),
      {
        params: {
          beforeId,
          pageSize,
        },
      }
    );

    return res.data;
  },

  markMessagesRead: async (
    chatId: number,
    messageIds: number[]
  ) => {
    await api.post(
      apiRoutes.chat.markRead(chatId),
      {
        messageIds,
      }
    );
  },

  editMessage: async (
    chatId: number,
    messageId: number,
    newContent: string
  ) => {
    const res = await api.patch(
      apiRoutes.chat.messageById(
        chatId,
        messageId
      ),
      {
        content: newContent,
      }
    );

    return res.data;
  },

  deleteMessage: async (
    chatId: number,
    messageId: number
  ) => {
    await api.delete(
      apiRoutes.chat.messageById(
        chatId,
        messageId
      )
    );
  },

  undoMessage: async (
    chatId: number,
    messageId: number
  ) => {
    await api.delete(
      apiRoutes.chat.undoMessage(
        chatId,
        messageId
      )
    );
  },

  createGroupChat: async (payload: {
    name: string;
    description: string;
    imageUrl?: string;
    memberIds: number[];
  }) => {
    const res = await api.post(
      apiRoutes.chat.group,
      payload
    );

    return res.data;
  },

  addGroupMembers: async (
    chatId: number,
    userIds: number[]
  ) => {
    const res = await api.post(
      `${apiRoutes.chat.base}/${chatId}/members`,
      { userIds }
    );

    return res.data;
  },

  removeGroupMember: async (
    chatId: number,
    targetUserId: number
  ) => {
    const res = await api.delete(
      `${apiRoutes.chat.base}/${chatId}/members/${targetUserId}`
    );

    return res.data;
  },

  updateMemberRole: async (
    chatId: number,
    targetUserId: number,
    role: (typeof MemberRoleType)[keyof typeof MemberRoleType]
  ) => {
    const res = await api.patch(
      `${apiRoutes.chat.base}/${chatId}/members/${targetUserId}/role`,
      { role }
    );

    return res.data;
  },

  updateGroupChat: async (
    chatId: number,
    body: {
      name?: string;
      description?: string;
      imageUrl?: string;
    }
  ) => {
    const res = await api.patch(
      `${apiRoutes.chat.base}/${chatId}/group`,
      body
    );

    return res.data;
  },
};

export default chatApi;