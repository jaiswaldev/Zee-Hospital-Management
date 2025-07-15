import { create } from "zustand";
import { toast } from "sonner";
import axios from "axios";

const Backend_API = import.meta.env.VITE_BACKEND_URL;

const usePatientChat = create((set, get) => ({
  messagesByDoctor: {}, // { [doctorId]: [messages] }
  doctors: [],
  selectedDoctor: null,
  isDoctorsLoading: false,
  isMessagesLoading: false,
  unreadCounts: {}, // { [doctorId]: number }

  getDoctors: async () => {
    set({ isDoctorsLoading: true });
    try {
      const res = await axios.get(`${Backend_API}/message/doctors`, {
        withCredentials: true,
      });
      set({ doctors: Array.isArray(res.data.data) ? res.data.data : [] });
    } catch (error) {
      set({ doctors: [] });
      toast.error(error?.response?.data?.message || "Failed to load doctors");
    } finally {
      set({ isDoctorsLoading: false });
    }
  },

  getMessages: async (doctorId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axios.get(`${Backend_API}/message/doctor/${doctorId}`, {
        withCredentials: true,
      });
      set((state) => ({
        messagesByDoctor: {
          ...state.messagesByDoctor,
          [doctorId]: res.data.data || [],
        },
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedDoctor } = get();
    if (!selectedDoctor?._id) return;

    try {
      const res = await axios.post(
        `${Backend_API}/message/doctor/send/${selectedDoctor._id}`,
        messageData,
        { withCredentials: true }
      );
      set((state) => {
        const prev = state.messagesByDoctor[selectedDoctor._id] || [];
        return {
          messagesByDoctor: {
            ...state.messagesByDoctor,
            [selectedDoctor._id]: [...prev, res.data.data],
          },
        };
      });
    } catch (error) {
      console.error("Error sending message:", error?.response?.data?.message);
      toast.error(error?.response?.data?.message || "Failed to send message");
    }
  },

  subscribeToMessages: (socket) => {
    if (!socket) return;
    socket.off("newMessage"); // Prevent duplicate listeners
    socket.on("newMessage", (newMessage) => {
      const doctorId = newMessage.senderId;
      set((state) => {
        const prev = state.messagesByDoctor[doctorId] || [];
        const isChatOpen = state.selectedDoctor?._id === doctorId;
        return {
          messagesByDoctor: {
            ...state.messagesByDoctor,
            [doctorId]: [...prev, newMessage],
          },
          unreadCounts: {
            ...state.unreadCounts,
            [doctorId]: isChatOpen ? 0 : (state.unreadCounts[doctorId] || 0) + 1,
          },
        };
      });
    });
  },

  unsubscribeFromMessages: (socket) => {
    if (socket) {
      socket.off("newMessage");
    }
  },

  setSelectedDoctor: (selectedDoctor) => {
    if (!selectedDoctor) {
      set({ selectedDoctor: null });
      return;
    }
    set((state) => ({
      selectedDoctor,
      unreadCounts: {
        ...state.unreadCounts,
        [selectedDoctor._id]: 0,
      },
    }));
  },
}));

export default usePatientChat;
