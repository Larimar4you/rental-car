import type { Car } from "@/types/car";
import styles from "./CarDetails.module.css";

interface CarDetailsProps {
  car: Car;
}

export default function CarDetails({ car }: CarDetailsProps) {
  const specifications = [
    `Year: ${car.year}`,
    `Type: ${car.type}`,
    `Fuel Consumption: ${car.fuelConsumption}`,
    `Engine: ${car.engine}`,
    `Mileage: ${car.mileage.toLocaleString("en-US")} km`,
  ];

  return (
    <section className={styles.details}>
      <div className={styles.intro}>
        <div className={styles.heading}>
          <h1 className={styles.title}>
            {car.brand} {car.model}, {car.year}
          </h1>
        </div>

        <p className={styles.location}>
          {car.location.city}, {car.location.country}
        </p>

        <p className={styles.price}>${car.rentalPrice}</p>

        <p className={styles.description}>{car.description}</p>
      </div>

      <div className={styles.group}>
        <h2 className={styles.groupTitle}>Rental Conditions:</h2>

        <ul className={styles.list}>
          {car.rentalConditions.map((condition) => (
            <li key={condition} className={styles.listItem}>
              <span className={styles.check} aria-hidden="true">
                ✓
              </span>
              {condition}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.group}>
        <h2 className={styles.groupTitle}>Car Specifications:</h2>

        <ul className={styles.list}>
          {specifications.map((specification) => (
            <li key={specification} className={styles.listItem}>
              <span className={styles.check} aria-hidden="true">
                ✓
              </span>
              {specification}
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.group}>
        <h2 className={styles.groupTitle}>Features</h2>

        <ul className={styles.list}>
          {car.features.map((feature) => (
            <li key={feature} className={styles.listItem}>
              <span className={styles.check} aria-hidden="true">
                ✓
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
