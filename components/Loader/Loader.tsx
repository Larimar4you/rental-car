import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div
      className={styles.overlay}
      role="status"
      aria-live="polite"
      aria-label="Loading cars"
    >
      <div className={styles.modal}>
        <div className={styles.spinner} aria-hidden="true" />

        <h2 className={styles.title}>Loading cars...</h2>

        <p className={styles.description}>
          Please wait while we fetch the best
          <br />
          cars for you
        </p>
      </div>
    </div>
  );
}
