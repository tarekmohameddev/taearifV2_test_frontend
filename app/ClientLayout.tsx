"use client";
import React from "react";
import useAuthStore from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const fetchUserData = useAuthStore((state) => state.fetchUserData);
  const UserIslogged = useAuthStore((state) => state.UserIslogged);
  const IsLoading = useAuthStore((state) => state.IsLoading);

  // عند التركيب (mount)، نقوم بجلب بيانات المستخدم
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
      return <> </>;
    }
  }

  return <>{children}</>;
}
