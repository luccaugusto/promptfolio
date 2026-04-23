import React from "react";
import { Promptfolio } from "../promptfolio/Promptfolio";
import { YouPoop } from "../youpoop/YouPoop";
import { Resume } from "../resume/Resume";
import { Gallery } from "../gallery/Gallery";

export type Program = {
  name: string;
  label: string;
  icon: string;
  kind: "window" | "redirect";
  Component?: React.FC;
  url?: string;
  window?: {
    width?: string;
    height?: string;
    draggable?: boolean;
    randomPosition?: boolean;
  };
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
    window: {
      width: "360px",
      height: "640px",
      draggable: true,
      randomPosition: true,
    },
  },
  {
    name: "gallery",
    label: "Gallery",
    icon: asset("gallery-icon.png"),
    kind: "window",
    Component: Gallery,
    window: {
      width: "960px",
      height: "720px",
      draggable: true,
      randomPosition: true,
    },
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
