"use client";
import CarList from "@/components/CarList/CarList";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCars } from "@/lib/api";

export default function Catalog() {
  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cars"],

    queryFn: ({ pageParam }) => getCars(pageParam),

    initialPageParam: 1,

    getNextPageParam: (lastPage) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  if (isPending) {
    return <p>Loading cars...</p>;
  }

  if (isError) {
    return <p>Failed to load cars.</p>;
  }

  const cars = data.pages.flatMap((page) => page.cars);

  return (
    <main>
      <h1>Car catalog</h1>
      <CarList cars={cars} />

      {hasNextPage && (
        <button
          type="button"
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </main>
  );
}
