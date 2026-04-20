import React from "react";
import { Promptfolio } from "../promptfolio/Promptfolio";

export type Program = {
  name: string;
  label: string;
  icon: string;
  Component: React.FC;
};

export const programs: Program[] = [
  {
    name: "promptfolio",
    label: "promptfolio",
    icon: `${process.env.PUBLIC_URL}/promptfolio-icon.png`,
    Component: Promptfolio,
  },
];
