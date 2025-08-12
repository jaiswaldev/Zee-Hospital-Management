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
                selectedPatient ? "block" : "hidden"
              } md:block`}
            >
              {selectedPatient ? (
                <ChatContainer
                  authUserId={auth?.userId}
                  selectedUser={selectedPatient}
                  setSelectedUser={setSelectedPatient}
                  onlineUserIds={auth?.onlinePatients}
                  role="doctor"
                />
              ) : (
                <div className="hidden md:block flex-1 h-full">
                  <NoChatSelected role="doctor" />
                </div>
              )}
            </div>
            {/* Sidebar: show on mobile if no chat, always on desktop */}
            <div
              className={`h-full w-full md:w-auto ${
                selectedPatient ? "hidden" : "block"
              } md:block`}
            >
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
    </div>
  );
};

export default DoctorMessageApp;
