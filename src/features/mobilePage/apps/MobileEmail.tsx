import styles from "../MobilePage.module.css";

export function MobileEmail() {
  return (
    <div className={styles.appContent}>
      <h2>Email</h2>
      <p>Want to get in touch? Hit me up at</p>{" "}
      <a href="mailto:lucca@luccaaugusto.xyz">lucca@luccaaugusto.xyz</a>
    </div>
  );
}
