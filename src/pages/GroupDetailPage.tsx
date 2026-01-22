import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapContainer } from "@/components/map/MapContainer";
import { getGroupById } from "@/data/farmerGroups";
import logoWhatsapp from "@/assets/logo-whatsapp.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faMapLocationDot, faUsers, faUser, faPhone, faMap } from "@fortawesome/free-solid-svg-icons";

const GroupDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const group = getGroupById(id || "");

  if (!group) {
    return (
      <Layout>
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-semibold mb-4">Kelompok Tani tidak ditemukan</h1>
          <Link to="/">
            <Button variant="outline">
              <FontAwesomeIcon icon={faChevronLeft} className="mr-2 h-3 w-3" />
              Kembali ke Beranda
            </Button>
          </Link>
        </div>
      </Layout>
    );
  }

  const whatsappLink = group.phone
    ? `https://wa.me/62${group.phone.replace(/^0/, "").replace(/\D/g, "")}?text=Halo, saya ingin menghubungi ${group.name}`
    : null;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-accent/20 py-12">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              variant="ghost"
              size="sm"
              className="mb-4"
              onClick={() => navigate(-1)}
            >
              <FontAwesomeIcon icon={faChevronLeft} className="mr-1 h-3 w-3" />
              Kembali
            </Button>

            <div className="flex flex-col lg:flex-row gap-8">
              {/* Info Section */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <Badge className="bg-primary text-primary-foreground hover:bg-primary/90">
                    {group.commodity}
                  </Badge>
                  <Badge variant="outline">
                    Kec. {group.district}
                  </Badge>
                </div>

                <h1 className="text-2xl md:text-4xl font-semibold text-foreground mb-4">
                  {group.name}
                </h1>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <FontAwesomeIcon icon={faUser} className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Ketua</p>
                      <p className="font-medium text-foreground">{group.chairperson}</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.15 }}
                    className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <FontAwesomeIcon icon={faUsers} className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Anggota</p>
                      <p className="font-medium text-foreground">{group.memberCount} Orang</p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Lokasi</p>
                      <p className="font-medium text-foreground">
                        Desa {group.village}, Kec. {group.district}
                      </p>
                    </div>
                  </motion.div>

                  {group.phone && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.25 }}
                      className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <FontAwesomeIcon icon={faPhone} className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Telepon</p>
                        <p className="font-medium text-foreground">{group.phone}</p>
                      </div>
                    </motion.div>
                  )}

                  {/* Koordinat Card */}
                  {group.latitude && group.longitude && (
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="flex items-center gap-3 p-4 rounded-lg bg-card border border-border"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                        <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Koordinat</p>
                        <p className="font-medium text-foreground font-mono text-sm">
                          {group.latitude.toFixed(4)}, {group.longitude.toFixed(4)}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="flex flex-wrap gap-3"
                >
                  <Link to={`/map?highlight=${group.id}`}>
                    <Button className="gap-2 font-medium">
                      <FontAwesomeIcon icon={faMap} className="h-4 w-4" />
                      Lihat di Peta
                    </Button>
                  </Link>
                  {whatsappLink && (
                    <Button variant="outline" className="gap-2 font-medium" asChild>
                      <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                        <img src={logoWhatsapp} alt="WhatsApp" className="h-5 w-5" />
                        Hubungi via WhatsApp
                      </a>
                    </Button>
                  )}
                  <Link to={`/district/${group.districtSlug}`}>
                    <Button variant="outline" className="gap-2 font-medium">
                      <FontAwesomeIcon icon={faChevronLeft} className="h-3 w-3" />
                      Kembali ke {group.district}
                    </Button>
                  </Link>
                </motion.div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Map Section */}
      {group.latitude && group.longitude && (
        <section className="py-12">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <FontAwesomeIcon icon={faMapLocationDot} className="h-4 w-4 text-primary" />
                Lokasi pada Peta
              </h2>
              <MapContainer
                height="400px"
                showBoundaries={false}
                showMarkers={true}
                centerOnGroup={group}
                interactive={true}
              />
            </motion.div>
          </div>
        </section>
      )}
    </Layout>
  );
};

export default GroupDetailPage;
