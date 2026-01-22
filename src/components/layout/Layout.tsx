import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { PageTransition } from "./PageTransition";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { useRouteCache } from "@/hooks/useRouteCache";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

export const Layout = ({ children, showFooter = true }: LayoutProps) => {
  // Cache current route
  useRouteCache();

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      {showFooter && <Footer />}
      
      {/* Floating WhatsApp Button */}
      <FloatingWhatsApp 
        phoneNumber="083120996468" 
        message="Masukan atau saran" 
      />
    </div>
  );
};
