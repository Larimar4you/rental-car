"use client";

import { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import type { CarsFilters } from "@/types/filters";
import { getCars } from "@/lib/api";

import CarList from "@/components/CarList/CarList";
import Filters from "@/components/Filters/Filters";
import NotFound from "@/components/NotFound/NotFound";

import styles from "./Catalog.module.css";

export default function Catalog() {
  const [filters, setFilters] = useState<CarsFilters>({});
  const [resetKey, setResetKey] = useState(0);

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars", filters],

    queryFn: ({ pageParam }) => getCars(pageParam, filters),

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const handleReset = () => {
    setFilters({});
    setResetKey((prev) => prev + 1);
  };

  const cars = data?.pages.flatMap((page) => page.cars) ?? [];

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.filtersWrapper}>
          <Filters key={resetKey} onSearch={setFilters} />
        </div>

        {isPending ? (
          <p>Loading cars...</p>
        ) : isError ? (
          <p>Failed to load cars.</p>
        ) : cars.length === 0 ? (
          <div className={styles.notFoundWrapper}>
            <NotFound onReset={handleReset} />
          </div>
        ) : (
          <>
            <CarList cars={cars} />

            {hasNextPage && (
              <button
                type="button"
                className={styles.loadMore}
                onClick={() => fetchNextPage()}
                disabled={isFetchingNextPage}
              >
                {isFetchingNextPage ? "Loading..." : "Load More"}
              </button>
            )}
          </>
        )}
      </div>
    </main>
  );
}
