import Image from "next/image";
import Link from "next/link";
import type { Car } from "@/types/car";
import styles from "./CarCard.module.css";

interface CarCardProps {
  car: Car;
}

export default function CarCard({ car }: CarCardProps) {
  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={car.img}
          alt={`${car.brand} ${car.model}`}
          fill
          sizes="244px"
          className={styles.image}
        />
      </div>

      <div className={styles.title}>
        <h2>
          {car.brand} {car.model}, {car.year}
        </h2>

        <span>${car.rentalPrice}</span>
      </div>

      <div className={styles.info}>
        <div className={styles.infoRow}>
          <span>{car.location.city}</span>
          <span>{car.location.country}</span>
          <span>{car.rentalCompany}</span>
        </div>

        <div className={styles.infoRow}>
          <span>{car.type}</span>
          <span>{car.mileage.toLocaleString("en-US")} km</span>
        </div>
      </div>

      <Link
        href={`/catalog/${car.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
      >
        Read more
      </Link>
    </article>
  );
}
