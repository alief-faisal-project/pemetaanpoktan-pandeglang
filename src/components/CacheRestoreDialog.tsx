import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getLastRoute, clearRouteCache } from "@/hooks/useRouteCache";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export const CacheRestoreDialog = () => {
  const [open, setOpen] = useState(false);
  const [lastRoute, setLastRoute] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const cached = getLastRoute();
    
    // Only show dialog if there's a cached route different from current
    if (cached && cached !== "/" && cached !== location.pathname) {
      setLastRoute(cached);
      setOpen(true);
    }
  }, []);

  const handleRestore = () => {
    if (lastRoute) {
      navigate(lastRoute);
    }
    setOpen(false);
  };

  const handleDismiss = () => {
    clearRouteCache();
    setOpen(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Lanjutkan Sesi Sebelumnya?</AlertDialogTitle>
          <AlertDialogDescription>
            Anda sebelumnya mengunjungi halaman lain. Apakah ingin kembali ke halaman terakhir yang dikunjungi?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDismiss}>Tidak, Mulai Baru</AlertDialogCancel>
          <AlertDialogAction onClick={handleRestore}>Ya, Lanjutkan</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
