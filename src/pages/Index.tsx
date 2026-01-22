import { motion, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/cards/StatCard";
import { DistrictCard } from "@/components/cards/DistrictCard";
import {
  getDistricts,
  getTotalStats,
  searchGroups,
  farmerGroups,
} from "@/data/farmerGroups";
import { staggerContainer } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Link } from "react-router-dom";
import { useRef, useState, useMemo } from "react";
import heroBackground from "@/assets/hero-background.jpeg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapLocationDot,
  faUsers,
  faBuilding,
  faPaperPlane,
  faMagnifyingGlass,
  faXmark,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Pesan dari ${name}`);
    const body = encodeURIComponent(
      `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`,
    );
    window.location.href = `mailto:alieffaisal222@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact-section" className="py-16 bg-primary/5">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-4">
              <FontAwesomeIcon
                icon={faEnvelope}
                className="h-7 w-7 text-primary"
              />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Kirim Masukan
            </h2>
            <p className="text-muted-foreground font-light">
              Punya saran atau pertanyaan? Kirim pesan kepada kami.
            </p>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="space-y-4 bg-background rounded-xl p-6 shadow-lg border"
          >
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium">
                Nama
              </Label>
              <Input
                id="name"
                placeholder="Masukkan nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="font-medium">
                Pesan
              </Label>
              <Textarea
                id="message"
                placeholder="Tulis pesan Anda di sini..."
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full gap-2 font-medium"
            >
              <FontAwesomeIcon icon={faPaperPlane} className="h-4 w-4" />
              Kirim Pesan
            </Button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

const Index = () => {
  const districts = getDistricts();
  const stats = getTotalStats();
  const heroRef = useRef<HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Get all districts once (stable reference)
  const allDistricts = useMemo(() => getDistricts(), []);

  // Filter districts based on search query (searches groups, districts)
  const filteredDistricts = useMemo(() => {
    if (!searchQuery.trim()) return allDistricts;

    const lowerQuery = searchQuery.toLowerCase();
    const matchedDistrictSlugs = new Set<string>();

    // Search through farmer groups
    farmerGroups.forEach((group) => {
      if (
        group.name.toLowerCase().includes(lowerQuery) ||
        group.district.toLowerCase().includes(lowerQuery) ||
        group.village.toLowerCase().includes(lowerQuery) ||
        group.chairperson.toLowerCase().includes(lowerQuery)
      ) {
        matchedDistrictSlugs.add(group.districtSlug);
      }
    });

    return allDistricts.filter((d) => matchedDistrictSlugs.has(d.slug));
  }, [searchQuery, allDistricts]);

  return (
    <Layout>
      {/* Hero Section with Parallax */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-20 md:py-32 min-h-[70vh] flex items-center"
      >
        {/* Background Image with Parallax */}
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <img
            src={heroBackground}
            alt="Petani padi di sawah"
            className="w-full h-[120%] object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
          {/* Additional gradient overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
          />
        </motion.div>

        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ y: textY, opacity }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight drop-shadow-lg">
              Pemetaan Poktan{" "}
              <span className="text-primary">Kabupaten Pandeglang</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md font-light">
              Website simulasi pemetaan dan pengelolaan kelompok petani padi di seluruh
              wilayah Kabupaten Pandeglang, Banten.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col md:flex-row flex-wrap items-center justify-center gap-4"
            >
              <Link to="/map">
                <Button
                  size="lg"
                  className="gap-2 bg-primary hover:bg-primary/90 shadow-lg font-medium"
                >
                  <FontAwesomeIcon
                    icon={faMapLocationDot}
                    className="h-5 w-5"
                  />
                  Buka Peta Interaktif
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("districts")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                <motion.a
                  href="#districts"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Jelajahi Kecamatan
                </motion.a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-muted/30">
        <div className="container">
          {/* Desktop: Grid layout */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            <StatCard
              icon={faUsers}
              value={stats.totalGroups}
              label="Total Kelompok Tani"
              delay={0}
              href="/all-groups"
              hoverVariant="secondary"
            />
            <StatCard
              icon={faBuilding}
              value={stats.totalDistricts}
              label="Kecamatan"
              delay={0.1}
              href="/all-districts"
              hoverVariant="secondary"
            />
            <StatCard
              icon={faUsers}
              value={stats.totalMembers}
              label="Total Anggota"
              delay={0.2}
              href="/all-members"
              hoverVariant="secondary"
            />
          </div>

          {/* Mobile: Horizontal scroll carousel */}
          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div
              className="flex gap-4 pb-2"
              style={{ minWidth: "max-content" }}
            >
              <div className="w-[280px] flex-shrink-0">
                <StatCard
                  icon={faUsers}
                  value={stats.totalGroups}
                  label="Total Kelompok Tani"
                  delay={0}
                  href="/all-groups"
                  hoverVariant="secondary"
                />
              </div>
              <div className="w-[280px] flex-shrink-0">
                <StatCard
                  icon={faBuilding}
                  value={stats.totalDistricts}
                  label="Kecamatan"
                  delay={0.1}
                  href="/all-districts"
                  hoverVariant="secondary"
                />
              </div>
              <div className="w-[280px] flex-shrink-0">
                <StatCard
                  icon={faUsers}
                  value={stats.totalMembers}
                  label="Total Anggota"
                  delay={0.2}
                  href="/all-members"
                  hoverVariant="secondary"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Districts Grid */}
      <section id="districts" className="py-16">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Kecamatan di Kabupaten Pandeglang
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto font-light mb-6">
              Pilih kecamatan untuk melihat data kelompok tani yang ada di
              wilayah tersebut.
            </p>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
              />
              <Input
                type="text"
                placeholder="Cari kelompok petani, kecamatan, desa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-11 pr-10 h-12 rounded-full border-border bg-background shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                </button>
              )}
            </div>

            {searchQuery && (
              <p className="text-sm text-muted-foreground mt-4">
                Menampilkan {filteredDistricts.length} kecamatan yang cocok
              </p>
            )}
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredDistricts.length > 0 ? (
              filteredDistricts.map((district) => (
                <DistrictCard key={district.slug} district={district} />
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="h-12 w-12 text-muted-foreground/50 mb-4"
                />
                <p className="text-muted-foreground">
                  Tidak ditemukan kecamatan yang cocok dengan "{searchQuery}"
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </Layout>
  );
};

export default Index;
