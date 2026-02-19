import { createContext, useContext, ReactNode } from "react";
import { useUserLocation } from "@/hooks/useUserLocation";

interface LocationContextType {
  location: { latitude: number; longitude: number } | null;
  loading: boolean;
  error: string | null;
  requestLocation: () => void;
  clearLocation: () => void;
}

const LocationContext = createContext<LocationContextType | null>(null);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const locationData = useUserLocation();
  return (
    <LocationContext.Provider value={locationData}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocationContext = () => {
  const ctx = useContext(LocationContext);
  if (!ctx)
    throw new Error("useLocationContext must be used within LocationProvider");
  return ctx;
};
