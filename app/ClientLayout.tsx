"use client";
import { useEffect,useState } from "react";
import useAuthStore from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
    const fetchUserData = useAuthStore((state) => state.fetchUserData);
  const UserIslogged = useAuthStore((state) => state.UserIslogged);
  const IsLoading = useAuthStore((state) => state.IsLoading);

  useEffect(() => {
    setIsMounted(true);
    fetchUserData();
  }, [fetchUserData]);

  useEffect(() => {
    if (isMounted && !IsLoading && !UserIslogged) {
      router.push("/login");
    }
  }, [isMounted, IsLoading, UserIslogged, router]);

  if (pathname !== "/login" && pathname !== "/register") {
    if (!UserIslogged) {
      return <></>;
    }
  }

  return <>{children}</>;
}
