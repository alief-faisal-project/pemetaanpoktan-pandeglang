import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const CACHE_KEY = "pandeglang_last_route";

export const useRouteCache = () => {
  const location = useLocation();

  useEffect(() => {
    // Save current route to localStorage
    localStorage.setItem(CACHE_KEY, location.pathname + location.search);
  }, [location]);
};

export const getLastRoute = (): string | null => {
  return localStorage.getItem(CACHE_KEY);
};

export const clearRouteCache = () => {
  localStorage.removeItem(CACHE_KEY);
};
