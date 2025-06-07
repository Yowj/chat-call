import { axiosInstance } from "./axios";

export const getAuthUser = async () => {
  try {
    const res = await axiosInstance.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log("Error in getAuthUser:", error);
    return null;
  }
};

export const signup = async (signupData) => {
  const response = await axiosInstance.post("/auth/signup", signupData);
  return response.data;
};

export const login = async (loginData) => {
  const response = await axiosInstance.post("/auth/login", loginData);
  return response.data;
};

export const logout = async () => {
  const res = await axiosInstance.post("/auth/logout");
  return res.data;
};

export const onboard = async (formData) => {
  const res = await axiosInstance.post("/auth/onboarding", formData);
  return res.data;
};

export const getUsers = async () => {
  try {
    const res = await axiosInstance.get("/users");
    return res.data;
  } catch (error) {
    console.log("Error in getUsers:", error);
  }
};

export const sendFriendRequest = async (recipientId) => {
  const res = await axiosInstance.post(`/users/friend-request/${recipientId}`);
  return res.data;
};

export const getFriendRequests = async () => {
  console.log("Fetching friend requests...");
  const res = await axiosInstance.get("/users/friend-requests");
  console.log("Server response:", res.data);
  return res.data;
};

export const acceptFriendRequest = async (id) => {
  const res = await axiosInstance.put(`/users/friend-request/${id}/accept`);

  return res.data;
};

export const getFriends = async () => {
  const res = await axiosInstance.get(`/users/friends`);
  return res.data;
};

export const getOutgoingFriendReqs = async () => {
  const res = await axiosInstance.get("/users/outgoing-friend-requests");
  return res.data;
};

export async function getStreamToken() {
  const response = await axiosInstance.get("/chat/token");
  return response.data;
}