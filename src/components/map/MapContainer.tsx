import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { farmerGroups, FarmerGroup } from "@/data/farmerGroups";
import { pandeglangBounds, getDistrictBoundaries } from "@/data/pandeglangGeoJSON";

// Fix for default marker icons
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapContainerProps {
  height?: string;
  showBoundaries?: boolean;
  showMarkers?: boolean;
  centerOnGroup?: FarmerGroup;
  highlightGroup?: FarmerGroup;
  onMarkerClick?: (group: FarmerGroup) => void;
  interactive?: boolean;
}

export const MapContainer = ({
  height = "400px",
  showBoundaries = true,
  showMarkers = true,
  centerOnGroup,
  highlightGroup,
  onMarkerClick,
  interactive = true,
}: MapContainerProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    const centerGroup = centerOnGroup || highlightGroup;
    const center = centerGroup
      ? [centerGroup.latitude!, centerGroup.longitude!]
      : pandeglangBounds.center;
    const zoom = centerGroup ? 14 : pandeglangBounds.zoom;

    const map = L.map(mapRef.current, {
      center: center as [number, number],
      zoom,
      scrollWheelZoom: interactive,
      dragging: interactive,
      zoomControl: interactive,
    });

    mapInstanceRef.current = map;

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Add district boundaries if enabled
    if (showBoundaries) {
      const boundaries = getDistrictBoundaries();
      boundaries.forEach((boundary) => {
        const polygon = L.geoJSON(boundary as any, {
          style: {
            color: "#16a34a",
            weight: 2,
            opacity: 0.6,
            fillColor: "#22c55e",
            fillOpacity: 0.1,
          },
        }).addTo(map);

        polygon.on("mouseover", () => {
          polygon.setStyle({
            fillOpacity: 0.3,
            weight: 3,
          });
        });

        polygon.on("mouseout", () => {
          polygon.setStyle({
            fillOpacity: 0.1,
            weight: 2,
          });
        });

        polygon.bindTooltip(`Kecamatan ${boundary.properties.name}`, {
          sticky: true,
        });
      });
    }

    // Add markers if enabled
    if (showMarkers) {
      const groupsToShow = centerOnGroup ? [centerOnGroup] : farmerGroups;

      groupsToShow.forEach((group, index) => {
        if (!group.latitude || !group.longitude) return;

        const isHighlighted = highlightGroup && group.id === highlightGroup.id;
        const markerColor = isHighlighted ? "#ef4444" : "hsl(142 76% 36%)";
        const markerSize = isHighlighted ? 40 : 32;

        const customIcon = L.divIcon({
          className: "custom-marker",
          html: `
            <div class="flex items-center justify-center rounded-full shadow-lg border-2 border-white transform transition-transform hover:scale-110 ${isHighlighted ? 'animate-pulse' : ''}" style="background-color: ${markerColor}; width: ${markerSize}px; height: ${markerSize}px;">
              <svg xmlns="http://www.w3.org/2000/svg" width="${isHighlighted ? 20 : 16}" height="${isHighlighted ? 20 : 16}" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
          `,
          iconSize: [markerSize, markerSize],
          iconAnchor: [markerSize / 2, markerSize],
          popupAnchor: [0, -markerSize],
        });

        const marker = L.marker([group.latitude, group.longitude], {
          icon: customIcon,
          zIndexOffset: isHighlighted ? 1000 : 0,
        }).addTo(map);

        // Add animation delay for staggered appearance
        setTimeout(() => {
          marker.getElement()?.classList.add("map-marker-bounce");
        }, index * 100);

        // Create popup content
        const popupContent = `
          <div class="p-3 min-w-[200px]">
            <h3 class="font-bold text-sm mb-2 ${isHighlighted ? 'text-red-600' : ''}">${group.name}</h3>
            <p class="text-xs text-gray-600 mb-1">Ketua: ${group.chairperson}</p>
            <p class="text-xs text-gray-600 mb-1">Desa ${group.village}, Kec. ${group.district}</p>
            <p class="text-xs text-gray-600">${group.memberCount} Anggota</p>
            ${!centerOnGroup ? `<a href="/group/${group.id}" class="mt-2 inline-block text-xs font-medium text-green-600 hover:underline">Lihat Detail →</a>` : ""}
          </div>
        `;

        marker.bindPopup(popupContent);
        
        // Open popup for highlighted marker
        if (isHighlighted) {
          setTimeout(() => marker.openPopup(), 500);
        }

        if (onMarkerClick) {
          marker.on("click", () => onMarkerClick(group));
        }
      });
    }

    return () => {
      map.remove();
    };
  }, [centerOnGroup, highlightGroup, showBoundaries, showMarkers, onMarkerClick, interactive]);

  return (
    <div
      ref={mapRef}
      style={{ height }}
      className="w-full rounded-lg border border-border overflow-hidden"
    />
  );
};
