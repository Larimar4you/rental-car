import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src="/logo.svg" alt="RentalCar" width={102} height={16} />
      </Link>

      <nav>
        <ul className={styles.navList}>
          <li>
            <Link href="/" className={styles.navLink}>
              Home
            </Link>
          </li>

          <li>
            <Link href="/catalog" className={styles.navLink}>
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
