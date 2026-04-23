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
  onFocus,
  draggable = true,
  width,
  height,
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
    const div = event.currentTarget;
    setInitialTop(event.pageY - div.offsetTop);
    setInitialLeft(event.pageX - div.offsetLeft);
    if (onFocus) onFocus();
  };

  const style: React.CSSProperties = { top: `${top}px`, left: `${left}px` };
  if (width) style.width = width;
  if (height) style.height = height;

  return (
    <div
      className={`${styles.floatingDiv} ${onTop ? styles.onTop : ""}`}
      onDrag={draggable ? handleWindowDrag : undefined}
      onDragStart={draggable ? handleDragStart : undefined}
      onMouseDown={() => onFocus && onFocus()}
      draggable={draggable}
      id={windowName}
      style={style}
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
