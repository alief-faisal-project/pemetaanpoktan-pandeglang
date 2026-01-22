import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FloatingWhatsAppProps {
  phoneNumber: string;
  message: string;
}

export const FloatingWhatsApp = ({ phoneNumber, message }: FloatingWhatsAppProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const contactSection = document.getElementById("contact-section");
      
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        
        // Show when contact section is in viewport
        const isInView = rect.top < windowHeight && rect.bottom > 0;
        setIsVisible(isInView);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial state

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    const formattedPhone = phoneNumber.replace(/^0/, "62");
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${formattedPhone}?text=${encodedMessage}`, "_blank");
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5, y: 20 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                onClick={handleClick}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 md:w-16 md:h-16 rounded-full bg-primary shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
                aria-label="Chat via WhatsApp"
              >
                {/* Wave animation - smooth continuous flow */}
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  animate={{ 
                    scale: [1, 1.4], 
                    opacity: [0.7, 0] 
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <motion.span
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  animate={{ 
                    scale: [1, 1.4], 
                    opacity: [0.7, 0] 
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.75,
                  }}
                />
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="w-8 h-8 md:w-10 md:h-10 text-white relative z-10"
                />
              </motion.button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Chat via WhatsApp</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </AnimatePresence>
  );
};
