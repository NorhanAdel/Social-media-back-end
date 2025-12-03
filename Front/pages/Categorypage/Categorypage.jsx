import React from "react";
import "./Categorypage.scss";
import { Herobg } from "../../Componenet";
import IMG from "../../Assets/River-inspired Japanese library becomes a favorite meeting point for kids.jfif";
export const Categorypage = () => {
  return (
    <div className="categorypage">
      <Herobg
        title1="BOOKS & Category"
        title2="join us to read any type of book that you want"
        img={IMG}
        page="Category"
      />
      <div className="categorycontainer _container">
        <h1>Category Page</h1>
        <span className="sub-heading"></span>
      </div>
    </div>
  );
};
