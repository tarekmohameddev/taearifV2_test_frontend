"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { EnhancedSidebar } from "./enhanced-sidebar";
import { DashboardHeader } from "./dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Eye, MoreHorizontal, Plus, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

// Sample blog posts data with image URLs
const blogPosts = [
  {
    id: 1,
    title: "أحدث اتجاهات التصميم الداخلي لعام 2023",
    excerpt:
      "استكشف أحدث اتجاهات التصميم الداخلي التي ستهيمن على المنازل والمساحات التجارية في عام 2023.",
    date: "15 يوليو 2023",
    author: "سارة أحمد",
    status: "منشور",
    views: 1245,
    comments: 23,
    category: "تصميم داخلي",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 2,
    title: "كيفية اختيار الألوان المناسبة لمنزلك",
    excerpt:
      "دليل شامل لاختيار مخططات الألوان المثالية لكل غرفة في منزلك، مع نصائح من خبراء التصميم.",
    date: "3 يونيو 2023",
    author: "محمد علي",
    status: "منشور",
    views: 987,
    comments: 15,
    category: "نصائح التصميم",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 3,
    title: "تحويل مساحة صغيرة إلى منزل مريح",
    excerpt:
      "نصائح وحيل عملية لتحويل الشقق والمنازل الصغيرة إلى مساحات معيشة مريحة وعملية وجميلة.",
    date: "22 مايو 2023",
    author: "ليلى حسن",
    status: "مسودة",
    views: 0,
    comments: 0,
    category: "مساحات صغيرة",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 4,
    title: "أفضل 10 نباتات منزلية لتنقية الهواء",
    excerpt:
      "قائمة بأفضل النباتات المنزلية التي لا تحسن جمال منزلك فحسب، بل تساعد أيضًا في تنقية الهواء.",
    date: "10 أبريل 2023",
    author: "أحمد محمود",
    status: "منشور",
    views: 2156,
    comments: 42,
    category: "نباتات منزلية",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 5,
    title: "دليل التجديد بميزانية محدودة",
    excerpt: "كيفية تجديد منزلك بأقل تكلفة ممكنة مع الحفاظ على الجودة والجمال.",
    date: "28 مارس 2023",
    author: "سارة أحمد",
    status: "مجدول",
    views: 0,
    comments: 0,
    category: "تجديد",
    image: "/placeholder.svg?height=200&width=350",
  },
  {
    id: 6,
    title: "تصميم غرفة المعيشة المثالية",
    excerpt:
      "خطوات لتصميم غرفة معيشة مريحة وأنيقة تناسب احتياجاتك وأسلوب حياتك.",
    date: "15 فبراير 2023",
    author: "خالد عمر",
    status: "منشور",
    views: 1823,
    comments: 37,
    category: "تصميم داخلي",
    image: "/placeholder.svg?height=200&width=350",
  },
];

export default function BlogsPage() {
  const [activeTab, setActiveTab] = useState("blog");
  const router = useRouter();

  return (
    <div className="flex min-h-screen flex-col" dir="rtl">
      <DashboardHeader />
      <div className="flex flex-1 flex-col md:flex-row">
        <EnhancedSidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">المدونة</h1>
                <p className="text-muted-foreground">
                  إدارة ونشر محتوى المدونة الخاص بك
                </p>
              </div>
              <Button
                className="flex items-center gap-2"
                onClick={() => router.push("/blogs/add")}
              >
                <Plus className="h-4 w-4" />
                <span>إضافة مقال جديد</span>
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden flex flex-col">
                  <div className="aspect-video w-full overflow-hidden">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="h-full w-full object-cover transition-all hover:scale-105"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg line-clamp-1">
                          {post.title}
                        </CardTitle>
                        <CardDescription className="mt-1 line-clamp-2">
                          {post.excerpt}
                        </CardDescription>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">القائمة</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem className="gap-2">
                            <Edit className="h-4 w-4" />
                            <span>تعديل</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Eye className="h-4 w-4" />
                            <span>معاينة</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Trash className="h-4 w-4" />
                            <span>حذف</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2 flex-grow">
                    <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                      <span>الكاتب: {post.author}</span>
                      <span>•</span>
                      <span>التاريخ: {post.date}</span>
                      <span>•</span>
                      <span>التصنيف: {post.category}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between pt-2">
                    <div className="flex gap-2">
                      <Badge
                        variant={
                          post.status === "منشور"
                            ? "default"
                            : post.status === "مسودة"
                              ? "outline"
                              : "secondary"
                        }
                      >
                        {post.status}
                      </Badge>
                    </div>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                      <span>{post.views} مشاهدة</span>
                      <span>{post.comments} تعليق</span>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <Pagination className="mt-6">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" />
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#" isActive>
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">2</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink href="#">3</PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </main>
      </div>
    </div>
  );
}
