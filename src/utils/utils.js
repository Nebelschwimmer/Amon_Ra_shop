import { useEffect, useState } from "react";

export const getIssues = (number) => {
  const query_number = number % 10;
  if (query_number === 1) return ' товар';
  if (query_number > 1 && query_number < 5) return ' товара';
  if (query_number > 4 || !query_number) return ' товаров';
};

export const useDebounce = (searchQuery, delay = 500) => {
  const [debounceValue, setDebounceValue] = useState(searchQuery);
  console.log({ searchQuery });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(searchQuery);
    }, delay);

    console.log({ timeout });

    return () => clearTimeout(timeout);
  }, [searchQuery]);
  return debounceValue;
};
