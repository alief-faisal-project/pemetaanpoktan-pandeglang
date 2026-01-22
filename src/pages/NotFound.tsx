import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { MapPin, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-muted mb-6"
        >
          <MapPin className="h-12 w-12 text-muted-foreground" />
        </motion.div>
        
        <h1 className="text-6xl font-bold text-foreground mb-2">404</h1>
        <p className="text-xl text-muted-foreground mb-6">
          Halaman tidak ditemukan
        </p>
        <p className="text-muted-foreground mb-8 max-w-md">
          Maaf, halaman yang Anda cari tidak tersedia. 
          Silakan kembali ke beranda.
        </p>
        
        <Link to="/">
          <Button size="lg" className="gap-2">
            <Home className="h-5 w-5" />
            Kembali ke Beranda
          </Button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
