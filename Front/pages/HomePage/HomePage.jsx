import React from "react";
import { About, Books, Staff } from "../../Componenet";
import { Header } from "../../Container";
export const HomePage = () => {
  return (
    <div>
      <Header />
      <About />
      <Books />
      <Staff />
    </div>
  );
};
