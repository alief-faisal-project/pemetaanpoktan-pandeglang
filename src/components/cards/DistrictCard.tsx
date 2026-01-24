import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { District } from "@/data/farmerGroups";
import { staggerItem } from "@/components/layout/PageTransition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot, faUsers, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface DistrictCardProps {
  district: District;
}

export const DistrictCard = ({ district }: DistrictCardProps) => {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="group relative overflow-hidden rounded-xl bg-card border border-border shadow-card hover:shadow-card-hover"
    >
      {/* Top accent bar */}
      <motion.div 
        className="absolute top-0 left-0 right-0 h-1 bg-primary"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />

      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <motion.div 
            className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 flex-shrink-0"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            <FontAwesomeIcon icon={faMapLocationDot} className="h-6 w-6 text-primary" />
          </motion.div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary">
            <FontAwesomeIcon icon={faUsers} className="h-3.5 w-3.5" />
            <span className="font-medium text-sm">{district.totalMembers} Anggota</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-1">
          Kecamatan {district.name}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 font-light">
          {district.groupCount} Kelompok Tani
        </p>

        <Link to={`/district/${district.slug}`}>
          <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors font-medium">
            Lihat Kelompok Tani
            <FontAwesomeIcon icon={faChevronRight} className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
