import React from "react";
import { FeaturePage, Herobg, Staff } from "../../Componenet";
import IMG from "../../Assets/River-inspired Japanese library becomes a favorite meeting point for kids.jfif";

export const Media = (props) => {
  return (
    <div>
      <Herobg
        title1="BOOKS & MEDIALISTING"
        title2="join us to read any type of book that you want"
        img={IMG}
        page="Books&Media"
      />
      <FeaturePage />
      <Staff />
    </div>
  );
};
