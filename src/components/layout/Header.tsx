import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import logoPandeglang from "@/assets/logo-pandeglang.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faMapLocationDot } from "@fortawesome/free-solid-svg-icons";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";

const navLinks: { href: string; label: string; icon: IconDefinition }[] = [
  { href: "/", label: "Beranda", icon: faHouse },
  { href: "/map", label: "Peta", icon: faMapLocationDot },
];

export const Header = () => {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo - Aligned to left */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center">
            <img 
              src={logoPandeglang} 
              alt="Logo Kabupaten Pandeglang" 
              className="h-10 w-auto object-contain mix-blend-multiply"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-foreground text-sm leading-tight">
              Pemetaan Kelompok Petani Padi
            </span>
            <span className="text-xs text-muted-foreground leading-tight font-light">
              Kab Pandeglang
            </span>
          </div>
        </Link>

        {/* Navigation - Right side */}
        <nav className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link key={link.href} to={link.href}>
                <Button
                  variant={isActive ? "secondary" : "ghost"}
                  size="sm"
                  className="relative overflow-hidden gap-2"
                >
                  <FontAwesomeIcon 
                    icon={link.icon} 
                    className="h-4 w-4 text-primary"
                  />
                  <span className="hidden sm:inline font-medium">
                    {link.label}
                  </span>
                  {isActive && (
                    <div className="absolute inset-0 bg-primary/10 rounded-md -z-10" />
                  )}
                </Button>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
