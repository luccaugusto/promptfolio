import React from "react";
import { Promptfolio } from "../promptfolio/Promptfolio";
import { YouPoop } from "../youpoop/YouPoop";
import { Resume } from "../resume/Resume";

export type Program = {
  name: string;
  label: string;
  icon: string;
  kind: "window" | "redirect";
  Component?: React.FC;
  url?: string;
};

const asset = (file: string) => `${process.env.PUBLIC_URL}/${file}`;

export const programs: Program[] = [
  {
    name: "promptfolio",
    label: "promptfolio",
    icon: asset("promptfolio-icon.png"),
    kind: "window",
    Component: Promptfolio,
  },
  {
    name: "resume",
    label: "Resume",
    icon: asset("document-icon.jpg"),
    kind: "window",
    Component: Resume,
  },
  {
    name: "youpoop",
    label: "YouPoop",
    icon: asset("youtube-icon.png"),
    kind: "window",
    Component: YouPoop,
  },
  {
    name: "gallery",
    label: "Gallery",
    icon: asset("gallery-icon.png"),
    kind: "redirect",
    url: "https://luccaaugusto.xyz",
  },
  {
    name: "github",
    label: "GitHub",
    icon: asset("github-icon.png"),
    kind: "redirect",
    url: process.env.REACT_APP_GITHUB_URL,
  },
  {
    name: "linkedin",
    label: "LinkedIn",
    icon: asset("linkedin-icon.png"),
    kind: "redirect",
    url: process.env.REACT_APP_LINKEDIN_URL,
  },
];
