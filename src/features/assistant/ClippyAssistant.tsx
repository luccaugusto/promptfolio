import React, { useState } from "react";
import styles from "./ClippyAssistant.module.css";

type Hint = {
  title: string;
  body: React.ReactNode;
};

const hints: Hint[] = [
  {
    title: "Hi there!",
    body: "This portfolio looks like a desktop. Click icons or use the terminal to explore.",
  },
  {
    title: "Resume",
    body: "View my CV in a new window.",
  },
  {
    title: "YouPoop",
    body: "All the entertainment you'll ever need.",
  },
  {
    title: "Gallery",
    body: "I like to draw and tattoo, check it out.",
  },
  {
    title: "GitHub",
    body: "View my GitHub profile in a new tab",
  },
  {
    title: "LinkedIn",
    body: "View my LinkedIn profile in a new tab.",
  },
  {
    title: "The terminal",
    body: "A simulator of a terminal emulator in your browser. Type commands and hit enter.",
  },
  {
    title: "Terminal Basic commands",
    body: (
      <>
        Try <code>help</code> for a list of commands and try them out. You can
        do everything and more :)
      </>
    ),
  },
];

export const ClippyAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [index, setIndex] = useState(0);

  if (!isOpen) return null;

  const hint = hints[index];
  const isFirst = index === 0;
  const isLast = index === hints.length - 1;

  return (
    <div className={styles.container}>
      <div className={styles.bubble}>
        <img
          className={styles.close}
          src={`${process.env.PUBLIC_URL}/close-button.png`}
          alt="close"
          onClick={() => setIsOpen(false)}
        />
        <div className={styles.title}>{hint.title}</div>
        <div className={styles.body}>{hint.body}</div>
        <div className={styles.nav}>
          <button
            className={styles.navBtn}
            onClick={() => setIndex((i) => Math.max(0, i - 1))}
            disabled={isFirst}
            aria-label="previous hint"
          >
            ◀
          </button>
          <span className={styles.index}>
            {index + 1} / {hints.length}
          </span>
          <button
            className={styles.navBtn}
            onClick={() => setIndex((i) => Math.min(hints.length - 1, i + 1))}
            disabled={isLast}
            aria-label="next hint"
          >
            ▶
          </button>
        </div>
      </div>
      <img
        className={styles.character}
        src={`${process.env.PUBLIC_URL}/clippy.png`}
        alt="assistant"
      />
    </div>
  );
};
