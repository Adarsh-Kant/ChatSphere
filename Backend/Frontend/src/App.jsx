import React, { useState, useEffect } from "react";
import Left from "./home/left/left";
import Right from "./home/right/right";
import Logout from "./home/left1/logout";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import useConversation from "./stateManage/useConversation";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import toast, { Toaster } from "react-hot-toast";
function App() {
  const [authUser, setAuthUser] = useAuth();
  const { selectedConversation } = useConversation();
  const [showLeft, setShowLeft] = useState(true);
  
  useEffect(() => {
    if (selectedConversation) {
      setShowLeft(false);
    }
  }, [selectedConversation]);
  
  console.log(authUser);
  return (
    <>
      {/* <Loading />  */}
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="flex h-screen w-full bg-slate-950">
                <div className="w-[4%] md:block hidden">
                  <Logout />
                </div>
                <div className={`${showLeft ? "block w-full md:w-[30%]" : "hidden md:block md:w-[30%]"} bg-black text-white`}>
                  <Left /> 
                </div>
                <div className={`${showLeft ? "hidden md:flex md:flex-1" : "flex flex-1"} flex-col`}>
                  <Right setShowLeft={setShowLeft} />
                </div>
              </div> 
            ) : (
              // <Login />
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to={"/"} /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to={"/"} /> : <Signup />}
        />
      </Routes>

      <Toaster />
    </>
  );
}
export default App;
