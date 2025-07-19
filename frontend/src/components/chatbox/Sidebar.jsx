import { Users } from "lucide-react";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import SidebarSkeleton from "./Skeleton/SidebarSkeleton";
import { getUserInitials } from "../../lib/utils";
import { formatMessageTime } from "../../lib/utils";

import useDoctorChat from "../../context/DoctorChatContext";
import usePatientChat from "../../context/PatientChatContext";

const Sidebar = ({
  title = "Your Contacts",
  users = [],
  selectedUser,
  setSelectedUser,
  isLoading,
  onlineUserIds = [],
  getUsers,
  role, 
}) => {
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  
  const unreadCounts =
    role === "doctor"
      ? useDoctorChat((state) => state.unreadCounts)
      : usePatientChat((state) => state.unreadCounts);

  useEffect(() => {
    if (typeof getUsers === "function") getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((u) => onlineUserIds.includes(u._id))
    : users;

  if (isLoading) return <SidebarSkeleton />;

  return (
    <aside className="h-full md:w-82 border-1 border-base-300 flex flex-col">
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="size-6" />
          <span className="font-medium block">{title}</span>
        </div>
      </div>

      <div className="overflow-y-auto w-full p-3">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`w-full h-15 p-3 flex gap-3 rounded-md mt-0.5
              hover:bg-gray-300 transition-colors
              ${selectedUser?._id === user._id ? "bg-gray-300" : ""}`}
          >
            <div className="relative mx-0 items-center">
              <Avatar className="h-10 w-10 rounded-full">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {getUserInitials(user.firstName + " " + user.lastName)}
                </AvatarFallback>
              </Avatar>
              {onlineUserIds.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900" />
              )}
            </div>
            <div className="block text-left min-w-0">
              <div className="font-medium truncate">
                {user.firstName + " " + user.lastName}
              </div>
              <div className="text-sm text-zinc-400">
                {onlineUserIds.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
            <div>
              {/* <div className="text-[10px] text-gray-500 text-right mt-1 cursor-default">
                {formatMessageTime(msg.createdAt)}
              </div> */}
              {/* Unread badge */}
              {unreadCounts?.[user._id] > 0 && (
                <span
                  className="absolute  right-15 flex items-center justify-center w-7 h-7 bg-red-500 text-white text-xs font-bold rounded-full shadow"
                  style={{ transform: "translate(35%, 35%)" }}
                >
                  {unreadCounts[user._id]}
                </span>
              )}
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">
            {showOnlineOnly ? "No online users" : "No users found."}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
