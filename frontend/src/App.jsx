import React from "react";
import { Routes, Route, Navigate } from "react-router";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import useAuthUser from "./hooks/useAuthUser";
import Layout from "./components/Layout";
import OnBoarding from "./pages/OnBoarding";
import Notifications from "./pages/Notifications";
import CallPage from "./pages/CallPage";
import ChatPage from "./pages/ChatPage";
import PageLoader from "./components/PageLoader";

const App = () => {
  const { authUser, isLoading } = useAuthUser();

  const isAuthenticated = Boolean(authUser);
  const isOnboarded = authUser?.isOnboarded;

  if (isLoading) return <PageLoader />;
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Layout showSidebar={true}>
                  <HomePage />
                </Layout>
              ) : (
                <Navigate to={"/onboarding"} />
              )
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route path="/signup" element={!isAuthenticated ? <SignUpPage /> : <Navigate to={"/"} />} />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to={"/"} />} />
        <Route
          path="/onboarding"
          element={
            isAuthenticated ? (
              isOnboarded ? (
                <Navigate to={"/"} />
              ) : (
                <Layout showSideBar={false}>
                  <OnBoarding />
                </Layout>
              )
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/notifications"
          element={
            isAuthenticated ? (
              <Layout showSideBar={true}>
                <Notifications />
              </Layout>
            ) : (
              <Navigate to={"/"} />
            )
          }
        />
        <Route
          path="/call/:id"
          element={
            isAuthenticated && isOnboarded ? (
            <CallPage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/chat/:id"
          element={
            isAuthenticated && isOnboarded ? (
              <Layout showSidebar={false}>
                <ChatPage />
              </Layout>
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
