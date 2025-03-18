"use client";

import type React from "react";

import { useState } from "react";
import {
  HelpCircle,
  X,
  ChevronRight,
  Search,
  BookOpen,
  PlayCircle,
  MessageSquareText,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetFooter,
} from "@/components/ui/sheet";

interface HelpCenterProps {
  contextualHelp?: {
    title: string;
    description: string;
    links: Array<{
      title: string;
      href: string;
      type: "article" | "video" | "tutorial";
    }>;
  };
}

export function HelpCenter({ contextualHelp }: HelpCenterProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<
    "contextual" | "popular" | "search"
  >(contextualHelp ? "contextual" : "popular");

  const popularArticles = [
    {
      title: "Getting started with your first website",
      href: "#",
      type: "article" as const,
    },
    {
      title: "How to connect a custom domain",
      href: "#",
      type: "article" as const,
    },
    {
      title: "Setting up your website navigation",
      href: "#",
      type: "video" as const,
    },
    {
      title: "Adding and managing team members",
      href: "#",
      type: "article" as const,
    },
    {
      title: "Optimizing your website for search engines",
      href: "#",
      type: "tutorial" as const,
    },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setActiveTab("search");
    }
  };

  const getIconForType = (type: "article" | "video" | "tutorial") => {
    switch (type) {
      case "article":
        return <BookOpen className="h-4 w-4" />;
      case "video":
        return <PlayCircle className="h-4 w-4" />;
      case "tutorial":
        return <ChevronRight className="h-4 w-4" />;
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <HelpCircle className="h-5 w-5" />
          <span className="sr-only">Help Center</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[340px] sm:w-[400px] p-0 flex flex-col">
        <SheetHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <SheetTitle className="flex items-center gap-2">
              <HelpCircle className="h-5 w-5" />
              Help Center
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <X className="h-4 w-4" />
                <span className="sr-only">Close</span>
              </Button>
            </SheetClose>
          </div>
          <SheetDescription>
            Find answers to your questions and learn how to use our platform.
          </SheetDescription>
          <form onSubmit={handleSearch} className="mt-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search for help..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </form>
        </SheetHeader>

        <div className="flex border-b">
          {contextualHelp && (
            <Button
              variant="ghost"
              className={`flex-1 rounded-none border-b-2 ${
                activeTab === "contextual"
                  ? "border-primary"
                  : "border-transparent"
              }`}
              onClick={() => setActiveTab("contextual")}
            >
              This Page
            </Button>
          )}
          <Button
            variant="ghost"
            className={`flex-1 rounded-none border-b-2 ${
              activeTab === "popular" ? "border-primary" : "border-transparent"
            }`}
            onClick={() => setActiveTab("popular")}
          >
            Popular
          </Button>
          {searchQuery && (
            <Button
              variant="ghost"
              className={`flex-1 rounded-none border-b-2 ${
                activeTab === "search" ? "border-primary" : "border-transparent"
              }`}
              onClick={() => setActiveTab("search")}
            >
              Results
            </Button>
          )}
        </div>

        <div className="flex-1 overflow-auto">
          {activeTab === "contextual" && contextualHelp && (
            <div className="p-4">
              <h3 className="font-medium text-sm">{contextualHelp.title}</h3>
              <p className="text-sm text-muted-foreground mt-1 mb-3">
                {contextualHelp.description}
              </p>
              <div className="space-y-2">
                {contextualHelp.links.map((link, i) => (
                  <a
                    key={i}
                    href={link.href}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm"
                  >
                    {getIconForType(link.type)}
                    <span>{link.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {activeTab === "popular" && (
            <div className="p-4">
              <h3 className="font-medium text-sm mb-3">Popular Articles</h3>
              <div className="space-y-2">
                {popularArticles.map((article, i) => (
                  <a
                    key={i}
                    href={article.href}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm"
                  >
                    {getIconForType(article.type)}
                    <span>{article.title}</span>
                  </a>
                ))}
              </div>
            </div>
          )}

          {activeTab === "search" && (
            <div className="p-4">
              <h3 className="font-medium text-sm mb-1">
                Search results for "{searchQuery}"
              </h3>
              <p className="text-xs text-muted-foreground mb-3">
                Showing 3 results
              </p>
              <div className="space-y-2">
                <a
                  href="#"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>How to manage your domain settings</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm"
                >
                  <PlayCircle className="h-4 w-4" />
                  <span>Video: Setting up domain DNS records</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-muted text-sm"
                >
                  <BookOpen className="h-4 w-4" />
                  <span>Troubleshooting domain connection issues</span>
                </a>
              </div>
            </div>
          )}
        </div>

        <SheetFooter className="flex flex-row items-center justify-between border-t p-4">
          <Button variant="outline" size="sm" className="gap-1">
            <MessageSquareText className="h-4 w-4" />
            <span>Chat Support</span>
          </Button>
          <Button variant="outline" size="sm" className="gap-1">
            <ExternalLink className="h-4 w-4" />
            <span>Help Center</span>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
