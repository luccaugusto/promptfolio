import styles from "../MobilePage.module.css";

export function MobileAbout() {
  return (
    <div className={styles.appContent}>
      <h2>About</h2>
      <p>
        Hi, I'm Lucca Augusto, Currently I work as a Full Stack Software
        Engineer building{" "}
        <a href="https://roadwayai.com" target="_blank" rel="noreferrer">
          RoadwayAI
        </a>
        .
      </p>
      <p></p>
      <p>
        This is my Dev Portfolio, make sure to check the desktop version as it
        is much cooler ;P
      </p>
      <p className={styles.footnote}>
        Fun fact:{" "}
        <a
          href="https://en.wikipedia.org/wiki/Linux_kernel_version_history#Releases_4.x.y"
          target="_blank"
          rel="noreferrer"
        >
          Linux 4.7.10 was named Psychotic Stoned Sheep
        </a>
        .
      </p>
    </div>
  );
}
