import React from "react";
import { Promptfolio } from "../promptfolio/Promptfolio";
import { YouPoop } from "../youpoop/YouPoop";

export type Program = {
  name: string;
  label: string;
  icon: string;
  kind: "window" | "redirect";
  Component?: React.FC;
  url?: string;
};

export const programs: Program[] = [
  {
    name: "promptfolio",
    label: "promptfolio",
    icon: `${process.env.PUBLIC_URL}/promptfolio-icon.png`,
    kind: "window",
    Component: Promptfolio,
  },
  {
    name: "youpoop",
    label: "YouPoop",
    icon: `${process.env.PUBLIC_URL}/youtube-icon.png`,
    kind: "window",
    Component: YouPoop,
  },
  {
    name: "gallery",
    label: "Gallery",
    icon: `${process.env.PUBLIC_URL}/gallery-icon.png`,
    kind: "redirect",
    url: "https://luccaaugusto.xyz",
  },
];
