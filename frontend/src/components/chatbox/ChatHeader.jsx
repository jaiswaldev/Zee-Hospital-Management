import { X } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getUserInitials } from "../../lib/utils";

const ChatHeader = ({ selectedUser, setSelectedUser, onlineUserIds }) => {
  if (!selectedUser) return null;

  return (
    <div className="p-0.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3 px-3">
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <Avatar className="h-10 w-10 rounded-full cursor-default">
                <AvatarFallback className="bg-blue-100 text-blue-600">
                  {getUserInitials(selectedUser.firstName + " " + selectedUser.lastName)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>

          <div>
            <h6 className="font-medium">
              {selectedUser.firstName + " " + selectedUser.lastName}
            </h6>
            <p className="text-sm font-light text-base-content/70">
              {onlineUserIds?.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
