// Simplified GeoJSON for Pandeglang district boundaries
// Replace with official GeoJSON data when available from BIG (Badan Informasi Geospasial)

import { getDistricts } from './farmerGroups';

export interface DistrictBoundary {
  type: "Feature";
  properties: {
    name: string;
    slug: string;
  };
  geometry: {
    type: "Polygon";
    coordinates: number[][][];
  };
}

// Approximate polygon boundaries for districts (placeholder)
// These are simplified rectangles around approximate district centers
// Replace with official boundaries from BPS or BIG

const createDistrictPolygon = (centerLat: number, centerLng: number, size: number = 0.05): number[][] => {
  return [
    [centerLng - size, centerLat - size],
    [centerLng + size, centerLat - size],
    [centerLng + size, centerLat + size],
    [centerLng - size, centerLat + size],
    [centerLng - size, centerLat - size],
  ];
};

const districtCenters: Record<string, [number, number]> = {
  cikeusik: [-6.6273, 105.7918],
  sobang: [-6.5490, 105.8273],
  munjul: [-6.4823, 105.9155],
  angsana: [-6.5156, 105.8595],
  picung: [-6.4266, 105.9484],
  pagelaran: [-6.3567, 106.0123],
  carita: [-6.2234, 105.8234],
  menes: [-6.4567, 105.9789],
  cisata: [-6.3890, 106.0234],
  saketi: [-6.4045, 106.0595],
  majasari: [-6.3234, 106.0012],
  kaduhejo: [-6.3456, 106.0456],
  cimanuk: [-6.3712, 106.0817],
};

export const getDistrictBoundaries = (): DistrictBoundary[] => {
  const districts = getDistricts();
  
  return districts.map((district) => {
    const center = districtCenters[district.slug] || [-6.4, 106.0];
    
    return {
      type: "Feature",
      properties: {
        name: district.name,
        slug: district.slug,
      },
      geometry: {
        type: "Polygon",
        coordinates: [createDistrictPolygon(center[0], center[1])],
      },
    };
  });
};

export const pandeglangBoundsGeoJSON = {
  type: "FeatureCollection",
  features: getDistrictBoundaries(),
};

// Pandeglang approximate bounds for map initialization
export const pandeglangBounds = {
  center: [-6.4, 105.95] as [number, number],
  zoom: 10,
  bounds: [
    [-6.8, 105.5], // Southwest
    [-6.1, 106.2], // Northeast
  ] as [[number, number], [number, number]],
};
