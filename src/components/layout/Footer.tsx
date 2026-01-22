import { motion } from "framer-motion";

import logoPandeglang from "@/assets/logo-pandeglang.png";

export const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="border-t border-border bg-muted/30"
    >
      <div className="container py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img 
              src={logoPandeglang} 
              alt="Logo Kabupaten Pandeglang" 
              className="h-12 w-auto object-contain"
            />
            <div>
              <p className="font-semibold text-foreground">
                Pemetaan Kelompok Petani Padi di Kabupaten Pandeglang
              </p>
              <p className="text-sm text-muted-foreground">
                Skripsi Alief Faisal Adriansyah
              </p>
            </div>
          </div>

        </div>

        <div className="mt-6 pt-6 border-t border-border text-center">
          <p className="text-sm text-muted-foreground uppercase">
            © {new Date().getFullYear()} RANCANG BANGUN SISTEM INFORMASI GEOGRAFIS (SIG) PEMETAAN KELOMPOK PETANI PADA KOMODITAS PADI DI KABUPATEN PANDEGLANG BERBASIS WEB
          </p>
        </div>
      </div>
    </motion.footer>
  );
};
