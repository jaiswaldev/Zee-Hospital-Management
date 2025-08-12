// src/pages/PatientMessageApp.jsx
import { useAuth } from "../../context/AuthContext";
import usePatientChat from "../../context/PatientChatContext";
import Sidebar from "../../components/chatbox/Sidebar";
import ChatContainer from "../../components/chatbox/ChatContainer";
import NoChatSelected from "../../components/chatbox/NoChatSelected";
import { useEffect } from "react";

const PatientMessageApp = () => {
  const {
    selectedDoctor,
    setSelectedDoctor,
    getDoctors,
    doctors,
    isDoctorsLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = usePatientChat();

  const { auth } = useAuth();

  useEffect(() => {
    if (auth.socket) {
      subscribeToMessages(auth.socket);
      return () => unsubscribeFromMessages(auth.socket);
    }
  }, [auth.socket, subscribeToMessages, unsubscribeFromMessages]);

  return (
    <div className="pt-20 h-[calc(100vh)]">
      {" "}
      {/* Make this the height constraint */}
      <div className="flex items-center justify-center h-full">
        {" "}
        {/* h-full here */}
        <div className="bg-base-100 shadow-cl w-full h-full p-1">
          {" "}
          {/* h-full here */}
          <div className="flex h-full overflow-hidden border">
            {" "}
            {/* h-full here */}
            {/* ChatContainer: show on mobile if chat selected, always on desktop */}
            <div
              className={`h-full w-full flex-1 ${
                selectedDoctor ? "block" : "hidden"
              } md:block`}
            >
              {selectedDoctor ? (
                <ChatContainer
                  authUserId={auth?.userId}
                  selectedUser={selectedDoctor}
                  setSelectedUser={setSelectedDoctor}
                  onlineUserIds={auth?.onlineDoctors}
                  role="patient"
                />
              ) : (
                <div className="hidden md:block flex-1 h-full">
                  <NoChatSelected role="patient" />
                </div>
              )}
            </div>
            {/* Sidebar: show on mobile if no chat, always on desktop */}
            <div
              className={`h-full w-full md:w-auto ${
                selectedDoctor ? "hidden" : "block"
              } md:block`}
            >
              <Sidebar
                title="Your Doctors"
                users={doctors}
                selectedUser={selectedDoctor}
                setSelectedUser={setSelectedDoctor}
                isLoading={isDoctorsLoading}
                onlineUserIds={auth?.onlineDoctors}
                getUsers={getDoctors}
                role="patient"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientMessageApp;
