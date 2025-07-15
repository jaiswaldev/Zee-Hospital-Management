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
    <div className="mt-16">
      <div className="flex items-center justify-center">
        <div className="bg-base-100 shadow-cl w-full h-[calc(100vh-6rem)] p-1">
          <div className="flex h-full overflow-hidden border">
            {selectedDoctor ? (
              <ChatContainer
                authUserId={auth?.userId}
                selectedUser={selectedDoctor}
                setSelectedUser={setSelectedDoctor}
                onlineUserIds={auth?.onlineDoctors}
                role="patient"
              />
            ) : (
              <NoChatSelected role="patient" />
            )}
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
  );
};

export default PatientMessageApp;
