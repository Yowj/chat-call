import { getFriendRequests } from "../lib/api";
import FriendRequestCard from "../components/FriendRequestCard";
import { useQueryClient, useQuery } from "@tanstack/react-query";

const Notifications = () => {
  const queryClient = useQueryClient();

  const {
    data: notifications,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });

  if (isLoading) {
    return <div className="flex justify-center p-4">Loading...</div>;
  }

  if (isError) {
    return <div className="flex justify-center p-4">Error: {error.message}</div>;
  }

  return (
    <div className="flex justify-center p-4">
      <div className="flex flex-col w-1/2 space-y-3">
        <h1 className="text-3xl font-bold">Notifications</h1>

        {/* Friend Requests */}
        <p className="text-xl font-bold">Friend Requests</p>
        {notifications.incomingReqs.length === 0 ? (
          <p>Empty</p>
        ) : (
          notifications.incomingReqs.map((friendRequest) => (
            <FriendRequestCard friend={friendRequest} key={friendRequest._id} />
          ))
        )}

        {/* Accepted Requests */}
        <p className="text-xl font-bold">New Connections</p>
        {notifications.acceptedReqs.length === 0 ? (
          <p className="card bg-base-200 hover:shadow-md transition-shadow w-full p-2 text-center">
            No new connections
          </p>
        ) : (
          notifications.acceptedReqs.map((acceptedReq) => (
            <div
              className="rounded-xl bg-base-300 w-full p-2 flex items-center space-x-2"
              key={acceptedReq.recipient._id}
            >
              <img src={acceptedReq.recipient.profilePic} className="avatar size-12 " />
              <div className="w-full">
                <div className="flex justify-between ">

                  <p className="text-lg">{acceptedReq.recipient.fullName}</p>
                  <p className="badge badge-secondary"> New friend</p>
                </div>

                <p className="text-xs text-primary">
                  {acceptedReq.recipient.fullName} accepted your friend request.
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
