import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Layout } from "@/components/layout/Layout";
import { GroupCard } from "@/components/cards/GroupCard";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { getGroupsByDistrict, getDistrictBySlug } from "@/data/farmerGroups";
import { staggerContainer } from "@/components/layout/PageTransition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faUsers, faMagnifyingGlass, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";

const DistrictPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [searchQuery, setSearchQuery] = useState("");

  const district = getDistrictBySlug(slug || "");
  const allGroups = getGroupsByDistrict(slug || "");

  const filteredGroups = useMemo(() => {
    if (!searchQuery.trim()) return allGroups;
    const query = searchQuery.toLowerCase();
    return allGroups.filter(
      (group) =>
        group.name.toLowerCase().includes(query) ||
        group.village.toLowerCase().includes(query) ||
        group.chairperson.toLowerCase().includes(query)
    );
  }, [allGroups, searchQuery]);

  if (!district) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">Kecamatan tidak ditemukan</h1>
          <Link to="/">
            <Button variant="outline">
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2 h-4 w-4" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/20 py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-4">
                <FontAwesomeIcon icon={faChevronLeft} className="mr-1 h-3 w-3" />
                Kembali
              </Button>
            </Link>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <FontAwesomeIcon icon={faMapLocationDot} className="h-6 w-6 text-primary" />
                  </div>
                  <h1 className="text-2xl md:text-3xl font-semibold text-foreground">
                    Kecamatan {district.name}
                  </h1>
                </div>
                <p className="text-muted-foreground font-light">
                  Daftar kelompok tani di wilayah Kecamatan {district.name}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                  <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-primary" />
                  <div className="text-sm">
                    <span className="font-semibold text-foreground">{district.groupCount}</span>
                    <span className="text-muted-foreground ml-1">Poktan</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-card border border-border">
                  <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-primary" />
                  <div className="text-sm">
                    <span className="font-semibold text-foreground">{district.totalMembers}</span>
                    <span className="text-muted-foreground ml-1">Anggota</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Search and Grid Section */}
      <section className="py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mb-8"
          >
            <SearchInput
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Cari nama poktan, desa, atau ketua..."
              className="max-w-md"
            />
          </motion.div>

          {filteredGroups.length > 0 ? (
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredGroups.map((group) => (
                <GroupCard key={group.id} group={group} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Tidak ada hasil</h3>
              <p className="text-muted-foreground font-light">
                Tidak ditemukan kelompok tani dengan kata kunci "{searchQuery}"
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setSearchQuery("")}
              >
                Hapus Pencarian
              </Button>
            </motion.div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default DistrictPage;
