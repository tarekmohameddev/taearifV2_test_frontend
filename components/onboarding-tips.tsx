"use client";

import { useState, useEffect } from "react";
import { X, ChevronRight, ChevronLeft, LightbulbIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface OnboardingTip {
  id: string;
  title: string;
  description: string;
  image?: string;
}

interface OnboardingTipsProps {
  section: string;
  onDismiss?: () => void;
}

export function OnboardingTips({ section, onDismiss }: OnboardingTipsProps) {
  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  // Check if tips have been dismissed before
  useEffect(() => {
    const dismissedTips = localStorage.getItem(`dismissed_tips_${section}`);
    if (dismissedTips) {
      setDismissed(true);
    }
  }, [section]);

  const handleDismiss = () => {
    localStorage.setItem(`dismissed_tips_${section}`, "true");
    setDismissed(true);
    if (onDismiss) {
      onDismiss();
    }
  };

  const tips: Record<string, OnboardingTip[]> = {
    domains: [
      {
        id: "domains-1",
        title: "What is a domain?",
        description:
          "A domain is your website's address on the internet (like example.com). It's what people type in their browser to visit your website.",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        id: "domains-2",
        title: "Why connect a custom domain?",
        description:
          "A custom domain makes your website look professional and builds trust with visitors. It's also easier for people to remember.",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        id: "domains-3",
        title: "How DNS works",
        description:
          "DNS (Domain Name System) connects your domain name to your website. Think of it like a phone book that translates domain names to server addresses.",
        image: "/placeholder.svg?height=100&width=200",
      },
    ],
    settings: [
      {
        id: "settings-1",
        title: "Welcome to Settings",
        description:
          "This is where you can customize your account, manage your team, and configure your website settings.",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        id: "settings-2",
        title: "Managing Your Team",
        description:
          "Invite team members to help manage your website. You can set different permission levels for each person.",
        image: "/placeholder.svg?height=100&width=200",
      },
      {
        id: "settings-3",
        title: "Billing & Subscriptions",
        description:
          "View and manage your subscription plan, payment methods, and billing history in the Billing tab.",
        image: "/placeholder.svg?height=100&width=200",
      },
    ],
  };

  const currentTips = tips[section] || [];
  const currentTip = currentTips[currentTipIndex];

  if (dismissed || !currentTip) {
    return null;
  }

  return (
    <Card className="border-primary/20 bg-primary/5 mb-6">
      <CardContent className="pt-6">
        <div className="absolute top-2 right-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={handleDismiss}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Dismiss tips</span>
          </Button>
        </div>
        <div className="flex items-start gap-3">
          <div className="rounded-full bg-primary/20 p-2 mt-0.5">
            <LightbulbIcon className="h-4 w-4 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-sm">{currentTip.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {currentTip.description}
            </p>
            {currentTip.image && (
              <div className="mt-3 rounded-md overflow-hidden">
                <img
                  src={currentTip.image || "/placeholder.svg"}
                  alt={currentTip.title}
                  className="w-full h-auto"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t border-primary/10 bg-primary/5 px-6">
        <div className="flex items-center text-xs text-muted-foreground">
          Tip {currentTipIndex + 1} of {currentTips.length}
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentTipIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentTipIndex === 0}
            className="h-7 w-7 p-0"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous tip</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              setCurrentTipIndex((prev) =>
                Math.min(currentTips.length - 1, prev + 1),
              )
            }
            disabled={currentTipIndex === currentTips.length - 1}
            className="h-7 w-7 p-0"
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next tip</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
