import React from "react";
import { Overview } from "./SubSections/Overview";
import { Status } from "./SubSections/Status";
import { Customers } from "./SubSections/Customers";

export const AboutSection = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center pt-8">
      <Overview />
      <Status />
      <Customers />
    </section>
  );
};
