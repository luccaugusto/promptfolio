import { useMemo } from "react";
import styles from "./YouPoop.module.css";

const VIDEO_IDS = [
  "xfuIlmywvXI", // 10 hours OIIAIAOIIIAI
  "f97W-nveCOM", // 24 hours of Shreksophone
  "3MU_6BPKmBg", // Mozart 2x speed left ear, the bible in chinese right ear
  "5mGuCdlCcNM", // 10 hours of bouncing dvd logo
  "tCHYrpiqDxI", // 10 hours of cockroach dancing to la cucaracha
];

export function YouPoop() {
  const videoId = useMemo(
    () => VIDEO_IDS[Math.floor(Math.random() * VIDEO_IDS.length)],
    [],
  );

  return (
    <div className={styles.wrapper}>
      <iframe
        title="YouPoop"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&playlist=${videoId}&mute=1`}
        allow="autoplay; encrypted-media; fullscreen"
        allowFullScreen
      />
    </div>
  );
}
