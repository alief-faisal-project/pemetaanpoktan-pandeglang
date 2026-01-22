import { motion, useScroll, useTransform } from "framer-motion";
import { Layout } from "@/components/layout/Layout";
import { StatCard } from "@/components/cards/StatCard";
import { DistrictCard } from "@/components/cards/DistrictCard";
import { getDistricts, getTotalStats, searchGroups, farmerGroups } from "@/data/farmerGroups";
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

/* ================= CONTACT SECTION ================= */

const ContactSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Pesan dari ${name}`);
    const body = encodeURIComponent(
      `Nama: ${name}\nEmail: ${email}\n\nPesan:\n${message}`
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
              <FontAwesomeIcon icon={faEnvelope} className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-3">
              Kirim Masukan
            </h2>
            <p className="text-muted-foreground font-light">
              Punya saran atau pertanyaan? Kirim pesan kepada kami.
            </p>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-4 bg-background rounded-xl p-6 shadow-lg border"
          >
            <div className="space-y-2">
              <Label>Nama</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Pesan</Label>
              <Textarea
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full gap-2 font-medium">
              <FontAwesomeIcon icon={faPaperPlane} />
              Kirim Pesan
            </Button>
          </motion.form>
        </motion.div>
      </div>
    </section>
  );
};

/* ================= MAIN ================= */

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

  const allDistricts = useMemo(() => getDistricts(), []);

  const filteredDistricts = useMemo(() => {
    if (!searchQuery.trim()) return allDistricts;

    const lowerQuery = searchQuery.toLowerCase();
    const matchedDistrictSlugs = new Set<string>();

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
      {/* ================= HERO ================= */}
      <section
        ref={heroRef}
        className="relative overflow-hidden py-20 md:py-32 min-h-[70vh] flex items-center"
      >
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <img src={heroBackground} className="w-full h-[120%] object-cover" />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>

        <div className="container relative">
          <motion.div
            style={{ y: textY, opacity }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              Pemetaan Poktan Padi di Wilayah{" "}
              <span className="text-primary">Kabupaten Pandeglang</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 font-light">
              Website pemetaan dan pengelolaan kelompok petani padi 
              di seluruh wilayah Kabupaten Pandeglang, Banten.
            </p>

            {/* ✅ BUTTON RESPONSIVE (SATU-SATUNYA PERUBAHAN) */}
            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full"
            >
              <Link to="/map" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary/90 shadow-lg font-medium">
                  <FontAwesomeIcon icon={faMapLocationDot} />
                  Buka Peta Persebaran
                </Button>
              </Link>

              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20 font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("districts")?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
              >
                <a href="#districts">Kecamatan Terdaftar</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ================= STATS (ASLI — NORMAL) ================= */}
      <section className="py-12 bg-muted/30">
        <div className="container">
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

          <div className="md:hidden overflow-x-auto scrollbar-hide">
            <div className="flex gap-4 pb-2" style={{ minWidth: "max-content" }}>
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

      {/* ================= DISTRICTS ================= */}
      <section id="districts" className="py-16">
        <div className="container">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredDistricts.map((district) => (
              <DistrictCard key={district.slug} district={district} />
            ))}
          </motion.div>
        </div>
      </section>

      <ContactSection />
    </Layout>
  );
};

export default Index;
