import { useEffect, useState } from "react";
import styles from "./FloatingWindow.module.css";

const transparentDragImage = new Image();
transparentDragImage.src =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

export function FloatingWindow({
  children,
  windowName,
  defaultTop,
  defaultLeft,
  onTop,
  onClose,
}: any) {
  const [top, setTop] = useState(0);
  const [left, setLeft] = useState(0);
  const [initialTop, setInitialTop] = useState(0);
  const [initialLeft, setInitialLeft] = useState(0);

  useEffect(() => {
    setTop(defaultTop);
    setLeft(defaultLeft);
  }, [defaultLeft, defaultTop]);

  const handleWindowDrag = (event: React.DragEvent<HTMLDivElement>) => {
    if (event.pageY === 0 && event.pageX === 0) {
      return;
    }
    setTop(event.pageY - initialTop);
    setLeft(event.pageX - initialLeft);
  };

  const handleDragStart = (event: React.DragEvent<HTMLDivElement>) => {
    event.dataTransfer.setDragImage(transparentDragImage, 0, 0);
    const div = event.target as HTMLDivElement;
    setInitialTop(event.pageY - div.offsetTop);
    setInitialLeft(event.pageX - div.offsetLeft);
  };

  return (
    <div
      className={`${styles.floatingDiv} ${onTop ? styles.onTop : ""}`}
      onDrag={(event) => handleWindowDrag(event)}
      onDragStart={(event) => handleDragStart(event)}
      draggable={true}
      id={`${windowName}-${Math.random() * 10}`}
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      <div className={styles.header}>
        <span>{windowName}</span>
        <img
          className={styles.close}
          src={`${process.env.PUBLIC_URL}/close-button.png`}
          alt="Close"
          onClick={() => onClose(windowName)}
        />
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
