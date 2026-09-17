import { FiChevronDown } from "react-icons/fi";
import styles from "./Filters.module.css";

export default function Filters() {
  return (
    <form className={styles.filters}>
      <div className={styles.field}>
        <label className={styles.label}>Car brand</label>

        <button type="button" className={styles.brand}>
          Choose a brand
          <FiChevronDown size={16} />
        </button>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Price/ 1 hour</label>

        <button type="button" className={styles.price}>
          Choose a price
          <FiChevronDown size={16} />
        </button>
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Car mileage / km</label>

        <div className={styles.mileage}>
          <input
            type="number"
            placeholder="From"
            aria-label="Mileage from"
            className={styles.from}
          />

          <input
            type="number"
            placeholder="To"
            aria-label="Mileage to"
            className={styles.to}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.search}>
          Search
        </button>

        <button type="reset" className={styles.clear}>
          Clear filters
        </button>
      </div>
    </form>
  );
}
