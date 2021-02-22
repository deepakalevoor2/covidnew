import React from "react";

import SignIn from "../../components/sign-in/sign-in.component";

import { HomePage, SignInDiv } from "./home.styles";

const Home = () => (
  <div>
    <HomePage>
    <img src={require("../../assets/covid.gif")} alt="covid" />
    </HomePage>
    <SignInDiv>
      <SignIn />
    </SignInDiv>
  </div>
);

export default Home;
