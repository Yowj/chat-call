import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";
import { MapPin } from "lucide-react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { sendFriendRequest } from "../lib/api";
import toast from "react-hot-toast";
import { useState } from "react";

const UserCard = ({ user }) => {

const [friendRequestSent, setFriendRequestSent] = useState(false);

  function getLanguageFlag(language) {
    if (!language) return null;

    const langLower = language.toLowerCase();
    const countryCode = LANGUAGE_TO_FLAG[langLower];

    if (countryCode) {
      return (
        <img
          src={`https://flagcdn.com/24x18/${countryCode}.png`}
          alt={`${langLower} flag`}
          className="h-3 mr-1 inline-block"
        />
      );
    }
    return null;
  }

  const useSendFR = () => {
    const queryClient = useQueryClient();
    const { mutate, error, isPending } = useMutation({
      mutationFn: sendFriendRequest,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["authUser"] });
        toast.success("Friend request sent!");
      },
      onError: (error) => {
        const message = error.response?.data?.message || "Failed to send friend request";
        toast.error(message);
      }
    });

    return { error, isPending, sendFRMutation: mutate };
  };

  const { error, isPending, sendFRMutation } = useSendFR();

  const handleSubmit = () => {
    sendFRMutation(user._id);
  };

  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow overflow-hidden">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={user.profilePic} alt={user.fullName} />
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold truncate">{user.fullName}</h3>
            <div className="flex text-xs">
              <MapPin size={17} />
              <span>{user.location}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-1">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(user?.nativeLanguage)}
            Native: {user.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(user.learningLanguage)}
            Learning: {user.learningLanguage}
          </span>
        </div>
        <div className="text-sm">
          <p className="truncate">{user.bio}</p>
        </div>

        <button className="btn btn-primary w-full" onClick={handleSubmit}>
          Send Friend Request
        </button>
      </div>
    </div>
  );
};
export default UserCard;
