import { useState, useMemo, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { MapContainer } from "@/components/map/MapContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { farmerGroups, searchGroups, FarmerGroup, getGroupById } from "@/data/farmerGroups";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLayerGroup, faMagnifyingGlass, faXmark, faList, faChevronRight } from "@fortawesome/free-solid-svg-icons";

const MapPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const highlightGroupId = searchParams.get("highlight");
  
  const [showBoundaries, setShowBoundaries] = useState(true);
  const [showMarkers, setShowMarkers] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  const highlightedGroup = highlightGroupId ? getGroupById(highlightGroupId) : undefined;

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return searchGroups(searchQuery);
  }, [searchQuery]);

  const handleMarkerClick = (group: FarmerGroup) => {
    navigate(`/group/${group.id}`);
  };

  return (
    <Layout showFooter={false}>
      <div className="relative flex flex-col h-[calc(100vh-4rem)]">
        {/* Controls Overlay */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="absolute top-4 left-4 right-4 z-10 flex flex-wrap gap-4"
        >
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Cari kelompok tani, desa, atau kecamatan..."
              className="pl-10 pr-10 bg-background shadow-lg border-border"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={() => setSearchQuery("")}
              >
                <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
              </Button>
            )}

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-background rounded-lg shadow-lg border border-border overflow-hidden"
              >
                <ScrollArea className="max-h-80">
                  {searchResults.map((group) => (
                    <button
                      key={group.id}
                      onClick={() => {
                        navigate(`/group/${group.id}`);
                        setSearchQuery("");
                      }}
                      className="w-full flex items-center justify-between p-3 hover:bg-muted transition-colors text-left"
                    >
                      <div>
                        <p className="font-medium text-foreground text-sm">{group.name}</p>
                        <p className="text-xs text-muted-foreground">
                          Desa {group.village}, Kec. {group.district}
                        </p>
                      </div>
                      <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 text-muted-foreground" />
                    </button>
                  ))}
                </ScrollArea>
              </motion.div>
            )}
          </div>

          {/* Layer Controls */}
          <div className="flex items-center gap-4 px-4 py-2 bg-background rounded-lg shadow-lg border border-border">
            <FontAwesomeIcon icon={faLayerGroup} className="h-4 w-4 text-muted-foreground" />
            <div className="flex items-center space-x-2">
              <Switch
                id="boundaries"
                checked={showBoundaries}
                onCheckedChange={setShowBoundaries}
              />
              <Label htmlFor="boundaries" className="text-sm cursor-pointer font-medium">
                Batas Kecamatan
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="markers"
                checked={showMarkers}
                onCheckedChange={setShowMarkers}
              />
              <Label htmlFor="markers" className="text-sm cursor-pointer font-medium">
                Marker Poktan
              </Label>
            </div>
          </div>

          {/* Sidebar Toggle (Mobile) */}
          <Button
            variant="outline"
            size="icon"
            className="md:hidden bg-background shadow-lg"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FontAwesomeIcon icon={faList} className="h-4 w-4" />
          </Button>
        </motion.div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="absolute bottom-4 right-4 z-10 p-4 bg-background rounded-lg shadow-lg border border-border"
        >
          <h3 className="font-semibold text-sm text-foreground mb-3">Legenda</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary border-2 border-primary-foreground shadow-sm" />
              <span className="text-xs text-muted-foreground">Lokasi Poktan</span>
            </div>
            {highlightedGroup && (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-sm" />
                <span className="text-xs text-muted-foreground">Poktan Terpilih</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-4 h-2 bg-primary/20 border border-primary rounded-sm" />
              <span className="text-xs text-muted-foreground">Batas Kecamatan</span>
            </div>
          </div>
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              Total: {farmerGroups.length} Poktan
            </p>
            {highlightedGroup && (
              <p className="text-xs text-red-500 font-medium mt-1">
                Menampilkan: {highlightedGroup.name}
              </p>
            )}
          </div>
        </motion.div>

        {/* Sidebar - Group List */}
        <motion.div
          initial={{ x: -300 }}
          animate={{ x: sidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.3 }}
          className="absolute top-20 left-4 bottom-4 w-80 z-10 bg-background rounded-lg shadow-lg border border-border overflow-hidden md:hidden"
        >
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h3 className="font-semibold">Daftar Kelompok Tani</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
            >
              <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="h-full pb-16">
            {farmerGroups.map((group) => (
              <button
                key={group.id}
                onClick={() => {
                  navigate(`/group/${group.id}`);
                  setSidebarOpen(false);
                }}
                className="w-full flex items-center justify-between p-3 hover:bg-muted transition-colors text-left border-b border-border"
              >
                <div>
                  <p className="font-medium text-foreground text-sm">{group.name}</p>
                  <p className="text-xs text-muted-foreground">
                    Desa {group.village}, Kec. {group.district}
                  </p>
                </div>
                <FontAwesomeIcon icon={faChevronRight} className="h-3 w-3 text-muted-foreground" />
              </button>
            ))}
          </ScrollArea>
        </motion.div>

        {/* Map */}
        <div className="flex-1">
          <MapContainer
            height="100%"
            showBoundaries={showBoundaries}
            showMarkers={showMarkers}
            onMarkerClick={handleMarkerClick}
            interactive={true}
            highlightGroup={highlightedGroup}
          />
        </div>
      </div>
    </Layout>
  );
};

export default MapPage;
