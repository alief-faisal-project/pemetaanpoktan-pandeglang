// ===============================
// IMPORTS
// ===============================

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";

// ===============================
// PROPS TYPE
// ===============================
interface FloatingWhatsAppProps {
  phoneNumber: string;
  message: string;
}

// ===============================
// COMPONENT
// ===============================
export const FloatingWhatsApp = ({
  phoneNumber,
  message,
}: FloatingWhatsAppProps) => {
  // ===============================
  // STATE VISIBILITY
  // ===============================
  const [isVisible, setIsVisible] = useState(false);

  // ===============================
  // DETEKSI SCROLL
  // ===============================
  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById("contact-section");
      const footer = document.querySelector("footer");

      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        const isContactInView =
          contactRect.top < windowHeight && contactRect.bottom > 0;

        let isFooterInView = false;
        if (footer) {
          const footerRect = footer.getBoundingClientRect();
          isFooterInView =
            footerRect.top < windowHeight && footerRect.bottom > 0;
        }

        setIsVisible(isContactInView && !isFooterInView);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===============================
  // HANDLE CLICK WHATSAPP
  // ===============================
  const handleClick = () => {
    const formattedPhone = phoneNumber.replace(/^0/, "62");
    const encodedMessage = encodeURIComponent(message);

    window.open(
      `https://wa.me/${formattedPhone}?text=${encodedMessage}`,
      "_blank",
    );
  };

  // ===============================
  // RENDER
  // ===============================
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={handleClick}
          /* ======================================================
             🔧 AREA PENGATURAN UKURAN FLOATING BUTTON
             
             - px-4  → lebar horizontal
             - py-2  → tinggi vertical
             - gap-2 → jarak icon & teks
             
             Ubah nilai ini jika ingin lebih kecil / besar
          ====================================================== */
          className="
            fixed 
            bottom-5        /* posisi bawah */
            right-5         /* posisi kanan */
            z-50 
            flex 
            items-center 
            gap-2           /* jarak icon & text */
            px-4            /* lebar horizontal */
            py-2            /* tinggi */
            rounded-full 
            bg-primary 
            text-white 
            shadow-md
          "
          aria-label="Beri Saran via WhatsApp"
        >

          {/* ======================================================
             🔧 UKURAN ICON
             
             - w-5 h-5 → kecil
             - w-6 h-6 → sedang
             - w-7 h-7 → besar
          ====================================================== */}
          <FontAwesomeIcon
            icon={faWhatsapp}
            className="w-5 h-5 relative z-10"
          />

          {/* ======================================================
             🔧 UKURAN TEKS
             
             - text-xs  → sangat kecil
             - text-sm  → kecil 
             - text-base → normal
          ====================================================== */}
          <span className="text-sm font-medium relative z-10">
            Kritik dan Saran
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
