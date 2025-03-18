import type { Metadata } from "next";
import OnboardingPage from "@/components/onboarding-page";

export const metadata: Metadata = {
  title: "إعداد موقعك | منشئ المواقع",
  description: "إعداد موقعك الجديد وتخصيصه",
};

export default function OnboardingRoute() {
  return <OnboardingPage />;
}
