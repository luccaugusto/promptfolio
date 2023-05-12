import { Promptfolio } from "../promptfolio/Promptfolio";

export interface programDesktopEntry {
  program: React.FC,
  icon: string,
}

export const programList: programDesktopEntry[] = [
  {
    program: Promptfolio,
    icon: `${process.env.PUBLIC_URL}/icon.jpg`
  }
];
