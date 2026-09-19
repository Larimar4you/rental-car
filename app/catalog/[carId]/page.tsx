import Image from "next/image";
import { notFound } from "next/navigation";
import { getCarById } from "@/lib/api";

import CarDetails from "@/components/CarDetails/CarDetails";
import RentalForm from "@/components/RentalForm/RentalForm";

import styles from "./page.module.css";

interface CarDetailsPageProps {
  params: Promise<{ carId: string }>;
}

export default async function CarDetailsPage({ params }: CarDetailsPageProps) {
  const { carId } = await params;

  let car;

  try {
    car = await getCarById(carId);
  } catch {
    notFound();
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.media}>
          <div className={styles.imageWrapper}>
            <Image
              src={car.img}
              alt={`${car.brand} ${car.model}`}
              fill
              sizes="640px"
              className={styles.image}
            />
          </div>

          <RentalForm carId={car.id} />
        </div>

        <CarDetails car={car} />
      </div>
    </main>
  );
}
