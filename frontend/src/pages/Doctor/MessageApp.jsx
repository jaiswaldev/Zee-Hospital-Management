// src/pages/DoctorMessageApp.jsx
import { useAuth } from "../../context/AuthContext";
import useDoctorChat from "../../context/DoctorChatContext";
import Sidebar from "../../components/chatbox/Sidebar";
import ChatContainer from "../../components/chatbox/ChatContainer";
import NoChatSelected from "../../components/chatbox/NoChatSelected";
import { useEffect } from "react";

const DoctorMessageApp = () => {
  const {
    selectedPatient,
    setSelectedPatient,
    getPatients,
    patients,
    isPatientsLoading,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useDoctorChat();

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
            {selectedPatient ? (
              <ChatContainer
                authUserId={auth?.userId}
                selectedUser={selectedPatient}
                setSelectedUser={setSelectedPatient}
                onlineUserIds={auth?.onlinePatients}
                role="doctor"
              />
            ) : (
              <NoChatSelected role="doctor" />
            )}
            <Sidebar
              title="Your Patients"
              users={patients}
              selectedUser={selectedPatient}
              setSelectedUser={setSelectedPatient}
              isLoading={isPatientsLoading}
              onlineUserIds={auth?.onlinePatients}
              getUsers={getPatients}
              role="doctor"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorMessageApp;
