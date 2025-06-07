
import { LANGUAGE_TO_FLAG } from "../constants";
import { acceptFriendRequest } from "../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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

const FriendRequestCard = ({ friend }) => {
  const queryClient = useQueryClient();

  const {mutate: mutateAcceptFriendRequest, isPending} = useMutation({
    mutationFn: (friendId) => acceptFriendRequest(friendId),
    onSuccess: () => {
      // This will refetch the friend requests
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutateAcceptFriendRequest(friend._id);
  };


  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow w-full ">
      <div className="card-body p-4">
        {/* USER INFO */}
        <div className="flex justify-between">
          <div className="flex items-center gap-3 mb-3">
            <div className="avatar size-12">
              <img src={friend.sender.profilePic} alt={friend.fullName} />
            </div>
            <h3 className="font-semibold truncate">{friend.sender.fullName}</h3>
          </div>
          <div>
            <p className="btn btn-sm btn-primary rounded-xl" onClick={handleSubmit}>
             {isPending? "Accepting..." : "Accept"}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.sender.nativeLanguage)}
            Native: {friend.sender.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.sender.learningLanguage)}
            Learning: {friend.sender.learningLanguage}
          </span>
        </div>
      </div>
    </div>
  );
};
export default FriendRequestCard;
