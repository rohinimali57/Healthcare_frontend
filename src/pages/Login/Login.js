import React from "react";
import Footer from "../../components/Shared/Footer";
import LoginArea from "./LoginArea/LoginArea";
import HomeThreeNavBar from "../HomeThree/HomeThreeNavBar/HomeThreeNavBar";

const Login = () => {
  return (
    <>
      <HomeThreeNavBar />
      <LoginArea />
      <Footer />
    </>
  );
};

export default Login;
