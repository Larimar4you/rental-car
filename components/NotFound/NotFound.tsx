import Image from "next/image";
import styles from "./NotFound.module.css";

interface NotFoundProps {
  onReset: () => void;
}

export default function NotFound({ onReset }: NotFoundProps) {
  return (
    <section className={styles.notFound}>
      <Image
        src="/not-found.png"
        alt="Car search illustration"
        width={414}
        height={388}
        className={styles.image}
      />

      <h2 className={styles.title}>No cars found</h2>

      <p className={styles.description}>
        We couldn’t find any cars that match your
        <br />
        current filters. Try changing your search
        <br />
        criteria or reset the filters.
      </p>

      <button type="button" className={styles.resetButton} onClick={onReset}>
        Reset filters
      </button>
    </section>
  );
}
