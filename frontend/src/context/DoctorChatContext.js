import { create } from "zustand";
import { toast } from "sonner";
import axios from "axios";

const Backend_API = import.meta.env.VITE_BACKEND_URL;

const useDoctorChat = create((set, get) => ({
  messagesByPatient: {}, // { [patientId]: [messages] }
  patients: [],
  selectedPatient: null,
  isPatientsLoading: false,
  isMessagesLoading: false,
  unreadCounts: {}, // { [patientId]: number }

  getPatients: async () => {
    set({ isPatientsLoading: true });
    try {
      const res = await axios.get(`${Backend_API}/message/patients`, {
        withCredentials: true,
      });
      set({ patients: Array.isArray(res.data.data) ? res.data.data : [] });
    } catch (error) {
      set({ patients: [] });
      toast.error(error?.response?.data?.message || "Failed to load patients");
    } finally {
      set({ isPatientsLoading: false });
    }
  },

  getMessages: async (patientId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axios.get(
        `${Backend_API}/message/patient/${patientId}`,
        {
          withCredentials: true,
        }
      );
      set((state) => ({
        messagesByPatient: {
          ...state.messagesByPatient,
          [patientId]: res.data.data || [],
        },
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedPatient } = get();
    try {
      const res = await axios.post(
        `${Backend_API}/message/patient/send/${selectedPatient._id}`,
        messageData,
        { withCredentials: true }
      );
      set((state) => {
        const prev = state.messagesByPatient[selectedPatient._id] || [];
        return {
          messagesByPatient: {
            ...state.messagesByPatient,
            [selectedPatient._id]: [...prev, res.data.data],
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
      const patientId = newMessage.senderId;
      set((state) => {
        const prev = state.messagesByPatient[patientId] || [];
        const isChatOpen = state.selectedPatient?._id === patientId;
        return {
          messagesByPatient: {
            ...state.messagesByPatient,
            [patientId]: [...prev, newMessage],
          },
          unreadCounts: {
            ...state.unreadCounts,
            [patientId]: isChatOpen ? 0 : (state.unreadCounts[patientId] || 0) + 1,
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

  setSelectedPatient: (selectedPatient) => {
    if (!selectedPatient) {
      set({ selectedPatient: null });
      return;
    }
    set((state) => ({
      selectedPatient,
      unreadCounts: {
        ...state.unreadCounts,
        [selectedPatient._id]: 0,
      },
    }));
  },
}));

export default useDoctorChat;
