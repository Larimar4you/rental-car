"use client";

import { useQuery } from "@tanstack/react-query";
import { getFilters } from "@/lib/api";
import { FiChevronDown } from "react-icons/fi";
import styles from "./Filters.module.css";

import { useState } from "react";
import type { CarsFilters } from "@/types/filters";

interface FiltersProps {
  onSearch: (filters: CarsFilters) => void;
}

export default function Filters({ onSearch }: FiltersProps) {
  const [isBrandOpen, setIsBrandOpen] = useState(false);

  const [isPriceOpen, setIsPriceOpen] = useState(false);

  const [selectedPrice, setSelectedPrice] = useState<number | null>(null);

  const [selectedBrand, setSelectedBrand] = useState("");

  const [minMileage, setMinMileage] = useState("");
  const [maxMileage, setMaxMileage] = useState("");

  const { data, isPending, isError } = useQuery({
    queryKey: ["filters"],
    queryFn: getFilters,
  });

  if (isPending) {
    return <p>Loading filters...</p>;
  }

  if (isError) {
    return <p>Failed to load filters.</p>;
  }

  const prices = Array.from(
    {
      length: Math.floor((data.price.max - data.price.min) / 10) + 1,
    },
    (_, index) => data.price.min + index * 10,
  );

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      (minMileage !== "" && Number(minMileage) < 0) ||
      (maxMileage !== "" && Number(maxMileage) < 0)
    ) {
      return;
    }

    if (
      minMileage !== "" &&
      maxMileage !== "" &&
      Number(minMileage) > Number(maxMileage)
    ) {
      return;
    }

    onSearch({
      brand: selectedBrand || undefined,
      price: selectedPrice ?? undefined,
      minMileage: minMileage !== "" ? Number(minMileage) : undefined,
      maxMileage: maxMileage !== "" ? Number(maxMileage) : undefined,
    });

    setIsBrandOpen(false);
    setIsPriceOpen(false);
  };

  const handleClear = () => {
    setSelectedBrand("");
    setSelectedPrice(null);
    setMinMileage("");
    setMaxMileage("");

    setIsBrandOpen(false);
    setIsPriceOpen(false);

    onSearch({});
  };

  return (
    <form className={styles.filters} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <span className={styles.label}>Car brand</span>

        <button
          type="button"
          className={styles.brand}
          aria-expanded={isBrandOpen}
          aria-controls="brand-options"
          onClick={() => {
            setIsBrandOpen((prev) => !prev);
            setIsPriceOpen(false);
          }}
        >
          {selectedBrand || "Choose a brand"}
          <FiChevronDown size={16} />
        </button>

        {isBrandOpen && (
          <ul id="brand-options" className={styles.brandDropdown}>
            {data.brands.map((brand) => (
              <li key={brand}>
                <button
                  type="button"
                  className={styles.brandOption}
                  onClick={() => {
                    setSelectedBrand(brand);
                    setIsBrandOpen(false);
                  }}
                >
                  {brand}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.field}>
        <span className={styles.label}>Price/ 1 hour</span>

        <button
          type="button"
          className={styles.price}
          aria-expanded={isPriceOpen}
          aria-controls="price-options"
          onClick={() => {
            setIsPriceOpen((prev) => !prev);
            setIsBrandOpen(false);
          }}
        >
          {selectedPrice !== null ? `To $${selectedPrice}` : "Choose a price"}

          <FiChevronDown size={16} />
        </button>

        {isPriceOpen && (
          <ul id="price-options" className={styles.priceDropdown}>
            {prices.map((price) => (
              <li key={price}>
                <button
                  type="button"
                  className={styles.brandOption}
                  onClick={() => {
                    setSelectedPrice(price);
                    setIsPriceOpen(false);
                  }}
                >
                  {price}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={styles.field}>
        <label className={styles.label}>Car mileage / km</label>

        <div className={styles.mileage}>
          <input
            type="number"
            placeholder="From"
            aria-label="Mileage from"
            className={styles.from}
            min={0}
            value={minMileage}
            onChange={(e) => setMinMileage(e.target.value)}
          />

          <input
            type="number"
            placeholder="To"
            aria-label="Mileage to"
            className={styles.to}
            min={0}
            value={maxMileage}
            onChange={(e) => setMaxMileage(e.target.value)}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.search}>
          Search
        </button>

        <button type="button" className={styles.clear} onClick={handleClear}>
          Clear filters
        </button>
      </div>
    </form>
  );
}
