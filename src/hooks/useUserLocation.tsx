import { useState, useCallback } from "react";

interface UserLocation {
  latitude: number;
  longitude: number;
}

// Haversine formula to calculate distance between two points in km
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
): number {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function useUserLocation() {
  const [location, setLocation] = useState<UserLocation | null>(() => {
    const saved = localStorage.getItem("user-location");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError("Geolocation tidak didukung browser ini");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const loc = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setLocation(loc);
        localStorage.setItem("user-location", JSON.stringify(loc));
        setLoading(false);
      },
      (err) => {
        setError("Gagal mendapatkan lokasi: " + err.message);
        setLoading(false);
      },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  }, []);

  const clearLocation = useCallback(() => {
    setLocation(null);
    localStorage.removeItem("user-location");
  }, []);

  return { location, loading, error, requestLocation, clearLocation };
}
