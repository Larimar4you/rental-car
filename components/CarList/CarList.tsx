import type { Car } from "@/types/car";
import styles from "./CarList.module.css";

interface CarListProps {
  cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
  return (
    <ul className={styles.grid}>
      {cars.map((car) => (
        <li key={car.id} className={styles.item}>
          {car.brand} {car.model}, {car.year}
        </li>
      ))}
    </ul>
  );
}
