// Import animasi dari framer-motion (tetap dipakai untuk animasi saat mount)
import { motion } from "framer-motion";

// Import Link untuk navigasi jika card memiliki href
import { Link } from "react-router-dom";

// Import FontAwesome untuk icon
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

// ===============================
// Interface Props
// ===============================
interface StatCardProps {
  icon: IconDefinition; // Icon yang ditampilkan
  value: number; // Nilai angka statistik
  label: string; // Label deskripsi
  delay?: number; // Delay animasi (opsional)
  href?: string; // Jika ada, card menjadi link
  hoverVariant?: "default" | "secondary"; // Tetap dipertahankan agar algoritma tidak berubah
}

// ===============================
// Komponen StatCard
// ===============================
export const StatCard = ({
  icon,
  value,
  label,
  delay = 0,
  href,
  hoverVariant = "default",
}: StatCardProps) => {
  // Variabel ini tetap dipertahankan
  // untuk menjaga struktur algoritma tetap sama
  const isSecondaryHover = hoverVariant === "secondary";

  // ===============================
  // Konten utama Card
  // ===============================
  const content = (
    <motion.div
      // Animasi hanya saat pertama kali muncul (bukan hover)
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
      // Semua hover & tap animation sudah dihapus
      className="
        flex 
        flex-col 
        items-center 
        gap-3 
        p-6 
        rounded-3xl   /* Bentuk card diperbesar */
        bg-card 
        border 
        border-border 
        shadow-card 
        cursor-pointer 
        relative
      "
    >
      {/* ===============================
          Icon Container (Static)
         =============================== */}
      <div
        className="
          relative 
          flex 
          h-14 
          w-14 
          items-center 
          justify-center 
          rounded-full 
          bg-primary/10
        "
      >
        <FontAwesomeIcon icon={icon} className="h-6 w-6 text-primary" />
      </div>

      {/* ===============================
          Angka Statistik
         =============================== */}
      <motion.span
        // Animasi muncul angka tetap dipertahankan
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.6,
          delay: delay + 0.2,
          type: "spring",
          stiffness: 200,
        }}
        className="relative stat-number text-3xl"
      >
        {/* Format angka Indonesia */}
        {value.toLocaleString("id-ID")}
      </motion.span>

      {/* ===============================
          Label Deskripsi
         =============================== */}
      <span className="relative text-sm text-muted-foreground font-medium">
        {label}
      </span>

      {/* Chevron / Arrow indicator sudah DIHAPUS TOTAL */}
    </motion.div>
  );

  // ===============================
  // Jika memiliki href → Bungkus dengan Link
  // ===============================
  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  // ===============================
  // Jika tidak ada href → return langsung
  // ===============================
  return content;
};
