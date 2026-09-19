import type { Car } from "@/types/car";
import styles from "./CarDetails.module.css";
import { LuMapPin, LuCircleCheck, LuCheck } from "react-icons/lu";

interface CarDetailsProps {
  car: Car;
}

export default function CarDetails({ car }: CarDetailsProps) {
  const specifications = [
    {
      label: `Year: ${car.year}`,
      icon: "/icons/calendar.svg",
    },
    {
      label: `Type: ${car.type}`,
      icon: "/icons/car.svg",
    },
    {
      label: `Fuel Consumption: ${car.fuelConsumption}`,
      icon: "/icons/fuel.svg",
    },
    {
      label: `Engine: ${car.engine}`,
      icon: "/icons/engine.svg",
    },
    {
      label: `Mileage: ${car.mileage.toLocaleString("en-US")} km`,
      icon: "/icons/mileage.svg",
    },
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
          <LuMapPin size={16} aria-hidden="true" />
          {car.location.city}, {car.location.country}
        </p>

        <p className={styles.price}>${car.rentalPrice}</p>

        <p className={styles.description}>{car.description}</p>
      </div>

      <div className={styles.carInfo}>
        <div className={styles.group}>
          <h2 className={styles.groupTitle}>Rental Conditions:</h2>

          <ul className={styles.list}>
            {car.rentalConditions.map((condition) => (
              <li key={condition} className={styles.listItem}>
                <LuCircleCheck className={styles.check} aria-hidden="true" />
                {condition}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.group}>
          <h2 className={styles.groupTitle}>Car Specifications:</h2>

          <ul className={styles.list}>
            {specifications.map((specification) => (
              <li key={specification.label} className={styles.listItem}>
                <img
                  src={specification.icon}
                  alt=""
                  width={16}
                  height={16}
                  className={styles.specIcon}
                />
                {specification.label}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.group}>
          <h2 className={styles.groupTitle}>Features</h2>

          <ul className={styles.list}>
            {car.features.map((feature) => (
              <li key={feature} className={styles.listItem}>
                <LuCircleCheck className={styles.check} aria-hidden="true" />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
