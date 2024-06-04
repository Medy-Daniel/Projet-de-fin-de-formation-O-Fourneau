import React from 'react';

// Custom hook for react responcive componants
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(
    window.matchMedia(query).matches
  );
  React.useEffect(() => {
    const matchQueryList = window.matchMedia(query);
    function handleChange(e: MediaQueryListEvent) {
      setMatches(e.matches);
    }
    matchQueryList.addEventListener('change', handleChange);
    return () => {
      matchQueryList.removeEventListener('change', handleChange);
    };
  }, [query]);
  return matches;
}
export default useMediaQuery;
