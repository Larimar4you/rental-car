import type { Car } from "@/types/car";
import CarCard from "@/components/CarCard/CarCard";
import styles from "./CarList.module.css";

interface CarListProps {
  cars: Car[];
}

export default function CarList({ cars }: CarListProps) {
  return (
    <ul className={styles.grid}>
      {cars.map((car) => (
        <li key={car.id} className={styles.item}>
          <CarCard car={car} />
        </li>
      ))}
    </ul>
  );
}
