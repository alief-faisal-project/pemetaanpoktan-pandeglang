import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { GroupCard } from "@/components/cards/GroupCard";
import { farmerGroups } from "@/data/farmerGroups";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faArrowLeft, faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const AllGroupsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredGroups = useMemo(() => {
    if (!searchQuery) return farmerGroups;
    const query = searchQuery.toLowerCase();
    return farmerGroups.filter(
      (group) =>
        group.name.toLowerCase().includes(query) ||
        group.village.toLowerCase().includes(query) ||
        group.chairperson.toLowerCase().includes(query) ||
        group.district.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <Layout>
      <div className="container py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mb-8"
        >
          <Link to="/">
            <Button variant="ghost" size="sm" className="mb-4 gap-2 hover:scale-105 transition-transform">
              <FontAwesomeIcon icon={faArrowLeft} className="h-3 w-3" />
              Kembali
            </Button>
          </Link>

          <div className="flex items-center gap-4 mb-2">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10"
            >
              <FontAwesomeIcon icon={faUsers} className="h-6 w-6 text-primary" />
            </motion.div>
            <div>
              <motion.h1 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-2xl md:text-3xl font-semibold text-foreground"
              >
                Semua Kelompok Tani
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground font-light"
              >
                Total {farmerGroups.length} kelompok tani di Kabupaten Pandeglang
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-6"
        >
          <div className="relative max-w-md">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari kelompok tani..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </motion.div>

        {/* Groups Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredGroups.map((group, index) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 0.1 + index * 0.05,
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <GroupCard group={group} />
            </motion.div>
          ))}
        </motion.div>

        {filteredGroups.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground font-light">Tidak ada hasil ditemukan</p>
          </motion.div>
        )}
      </div>
    </Layout>
  );
};

export default AllGroupsPage;
