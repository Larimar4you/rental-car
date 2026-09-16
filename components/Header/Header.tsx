"use client";

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./Header.module.css";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <Link href="/">
        <Image src="/logo.svg" alt="RentalCar" width={102} height={16} />
      </Link>

      <nav>
        <ul className={styles.navList}>
          <li>
            <Link
              href="/"
              className={`${styles.navLink} ${
                pathname === "/" ? styles.active : ""
              }`}
              aria-current={pathname === "/" ? "page" : undefined}
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              href="/catalog"
              className={`${styles.navLink} ${
                pathname.startsWith("/catalog") ? styles.active : ""
              }`}
              aria-current={
                pathname.startsWith("/catalog") ? "page" : undefined
              }
            >
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
