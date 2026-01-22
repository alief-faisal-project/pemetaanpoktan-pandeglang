import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

interface StatCardProps {
  icon: IconDefinition;
  value: number;
  label: string;
  delay?: number;
  href?: string;
  hoverVariant?: "default" | "secondary";
}

export const StatCard = ({ icon, value, label, delay = 0, href, hoverVariant = "default" }: StatCardProps) => {
  const isSecondaryHover = hoverVariant === "secondary";
  
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" } 
      }}
      whileTap={{ scale: 0.98 }}
      className={`flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border shadow-card cursor-pointer group relative overflow-hidden ${isSecondaryHover ? "hover:bg-secondary hover:border-secondary" : ""}`}
    >
      {/* Hover gradient overlay */}
      {!isSecondaryHover && (
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      )}
      
      <motion.div 
        className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 ${isSecondaryHover ? "group-hover:bg-primary/20" : "group-hover:bg-primary/20"}`}
        whileHover={{ rotate: [0, -10, 10, 0] }}
        transition={{ duration: 0.5 }}
      >
        <FontAwesomeIcon 
          icon={icon} 
          className="h-6 w-6 text-primary transition-colors duration-300"
        />
      </motion.div>
      
      <motion.span
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: delay + 0.2, type: "spring", stiffness: 200 }}
        className="relative stat-number text-3xl transition-colors duration-300"
      >
        {value.toLocaleString("id-ID")}
      </motion.span>
      
      <span className="relative text-sm text-muted-foreground font-medium transition-colors duration-300 group-hover:text-foreground">
        {label}
      </span>

      {/* Arrow indicator on hover */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileHover={{ opacity: 1, x: 0 }}
        className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.div>
    </motion.div>
  );

  if (href) {
    return <Link to={href}>{content}</Link>;
  }

  return content;
};
