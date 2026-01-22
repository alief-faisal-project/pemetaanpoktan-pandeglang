import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { getDistricts, getGroupsByDistrict } from "@/data/farmerGroups";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faArrowLeft, faMapLocationDot, faUser } from "@fortawesome/free-solid-svg-icons";

const AllMembersPage = () => {
  const districts = getDistricts();
  const totalMembers = districts.reduce((sum, d) => sum + d.totalMembers, 0);

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
                Total Anggota
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-muted-foreground font-light"
              >
                {totalMembers.toLocaleString("id-ID")} anggota dari {districts.length} kecamatan
              </motion.p>
            </div>
          </div>
        </motion.div>

        {/* Districts with Members */}
        <div className="space-y-6">
          {districts.map((district, districtIndex) => {
            const groups = getGroupsByDistrict(district.slug);
            
            return (
              <motion.div
                key={district.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.1 + districtIndex * 0.08,
                  ease: [0.25, 0.46, 0.45, 0.94]
                }}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                {/* District Header */}
                <motion.div 
                  className="bg-primary/5 px-6 py-4 border-b border-border"
                  whileHover={{ backgroundColor: "hsl(var(--primary) / 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold text-foreground">
                          Kecamatan {district.name}
                        </h2>
                        <p className="text-sm text-muted-foreground font-light">
                          {district.groupCount} kelompok tani
                        </p>
                      </div>
                    </div>
                    <motion.div 
                      className="text-right"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 + districtIndex * 0.08 }}
                    >
                      <p className="text-2xl font-semibold text-primary">
                        {district.totalMembers}
                      </p>
                      <p className="text-xs text-muted-foreground">anggota</p>
                    </motion.div>
                  </div>
                </motion.div>

                {/* Groups List */}
                <div className="divide-y divide-border">
                  {groups.map((group, groupIndex) => (
                    <motion.div
                      key={group.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        duration: 0.3, 
                        delay: 0.2 + districtIndex * 0.08 + groupIndex * 0.05 
                      }}
                      whileHover={{ backgroundColor: "hsl(var(--muted) / 0.3)" }}
                      className="px-6 py-4 transition-colors"
                    >
                      <Link 
                        to={`/group/${group.id}`}
                        className="flex items-center justify-between group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                            <FontAwesomeIcon icon={faUser} className="h-3 w-3 text-muted-foreground" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {group.name}
                            </p>
                            <p className="text-sm text-muted-foreground font-light">
                              Ketua: {group.chairperson} • Desa {group.village}
                            </p>
                          </div>
                        </div>
                        <motion.div 
                          className="flex items-center gap-2"
                          whileHover={{ scale: 1.1 }}
                        >
                          <FontAwesomeIcon icon={faUsers} className="h-3 w-3 text-muted-foreground" />
                          <span className="font-semibold text-foreground">
                            {group.memberCount}
                          </span>
                        </motion.div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default AllMembersPage;
