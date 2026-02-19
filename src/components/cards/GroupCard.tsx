import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FarmerGroup } from "@/data/farmerGroups";
import { staggerItem } from "@/components/layout/PageTransition";
import { Badge } from "@/components/ui/badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faUser, faLocationDot, faChevronRight } from "@fortawesome/free-solid-svg-icons";

interface GroupCardProps {
  group: FarmerGroup;
}

export const GroupCard = ({ group }: GroupCardProps) => {
  return (
    <motion.div
      variants={staggerItem}
      whileHover={{ y: -4 }}
      className="group relative overflow-hidden rounded-xl bg-card border border-border shadow-card transition-shadow hover:shadow-card-hover"
    >
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-s">
            {group.commodity}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <FontAwesomeIcon icon={faUsers} className="h-3.5 w-3.5" />
            <span>{group.memberCount} Anggota</span>
          </div>
        </div>

        <h3 className="text-lg font-semibold text-foreground mb-3">
          {group.name}
        </h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FontAwesomeIcon icon={faUser} className="h-3.5 w-3.5 shrink-0" />
            <span className="font-light">Ketua: {group.chairperson}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <FontAwesomeIcon icon={faLocationDot} className="h-3.5 w-3.5 shrink-0" />
            <span className="font-light">Desa {group.village}</span>
          </div>
        </div>

        <Link to={`/group/${group.id}`}>
          <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors font-medium">
            Lihat Detail
            <FontAwesomeIcon icon={faChevronRight} className="ml-1 h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};
