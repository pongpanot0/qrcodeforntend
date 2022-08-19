import React from "react";
import Features from "./Features/Features";
import Hero from "./Hero/Hero";
import { heroOne, heroTwo, heroThree } from "./data/HeroData";
import { Content } from "./Content/Content";
import Login from "./login";
function Mainpage() {
  return (
    <>
      <Hero />
      <Features  />
      <Content {...heroOne}/>

    </>
  );
}

export default Mainpage;
