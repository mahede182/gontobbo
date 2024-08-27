import { useState, useEffect } from "react";

/**
 * Custom hook to simulate a loading state.
 *
 * @param {boolean} initialState - The initial loading state. Defaults to true.
 * @param {number} delay - The delay in milliseconds before the loading state is set to false. Defaults to 2000 (2 seconds).
 * @returns {Object} An object containing the loading state and a function to set it.
 *
 * Example usage:
 *
 * const MyComponent = () => {
 *   const { isLoading } = useDummyLoading();
 *
 *   return <>{isLoading ? <LoadingIndicator /> : <MyContent />}</>;
 * };
 */
const useDummyLoading = (initialState = true, delay = 2000) => {
  const [isLoading, setIsLoading] = useState(initialState);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return { isLoading };
};

export { useDummyLoading };
