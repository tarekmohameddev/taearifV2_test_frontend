"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Building2,
  Calendar,
  Copy,
  Edit,
  ExternalLink,
  Filter,
  Grid3X3,
  List,
  MapPin,
  MoreHorizontal,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard-header";
import { EnhancedSidebar } from "@/components/enhanced-sidebar";

export function ProjectsManagementPage() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [priceRange, setPriceRange] = useState([500000, 2000000]);

  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "سكاي لاين ريزيدنس",
      location: "وسط المدينة، نيويورك",
      price: "من $750,000",
      status: "منشور",
      lastUpdated: "منذ يومين",
      completionDate: "2025",
      units: 120,
      developer: "مجموعة التطوير الحضري",
      description: "شقق فاخرة عالية الارتفاع مع إطلالات بانورامية على المدينة",
      thumbnail: "/placeholder.svg?height=300&width=500",
      featured: true,
    },
    {
      id: "2",
      name: "حدائق ريفرسايد",
      location: "ريفرسايد، شيكاغو",
      price: "من $550,000",
      status: "منشور",
      lastUpdated: "منذ أسبوع",
      completionDate: "2024",
      units: 85,
      developer: "ريفر هومز إنك",
      description: "منازل حديثة مع حدائق خاصة على طول الواجهة النهرية",
      thumbnail: "/placeholder.svg?height=300&width=500",
      featured: true,
    },
    {
      id: "3",
      name: "ذا أوكس",
      location: "ويستسايد، لوس أنجلوس",
      price: "من $1,200,000",
      status: "منشور",
      lastUpdated: "منذ 3 أيام",
      completionDate: "2023",
      units: 45,
      developer: "عقارات فاخرة",
      description: "مجتمع مسور حصري مع منازل فاخرة مبنية حسب الطلب",
      thumbnail: "/placeholder.svg?height=300&width=500",
      featured: false,
    },
    {
      id: "4",
      name: "مترو هايتس",
      location: "وسط المدينة، أتلانتا",
      price: "من $450,000",
      status: "مسودة",
      lastUpdated: "منذ 5 أيام",
      completionDate: "2024",
      units: 200,
      developer: "مطورون مدنيون",
      description:
        "تطوير متعدد الاستخدامات مع شقق ومحلات تجارية ومساحات مكتبية",
      thumbnail: "/placeholder.svg?height=300&width=500",
      featured: false,
    },
    {
      id: "5",
      name: "كوستال فيلاز",
      location: "واجهة المحيط، ميامي",
      price: "من $1,800,000",
      status: "مسودة",
      lastUpdated: "منذ يوم واحد",
      completionDate: "2026",
      units: 30,
      developer: "عقارات شاطئية",
      description: "فيلات حصرية على شاطئ البحر مع مسابح خاصة ووصول إلى الشاطئ",
      thumbnail: "/placeholder.svg?height=300&width=500",
      featured: true,
    },
    {
      id: "6",
      name: "جرين فالي",
      location: "ضواحي، سياتل",
      price: "من $650,000",
      status: "مسودة",
      lastUpdated: "منذ 4 أيام",
      completionDate: "2024",
      units: 75,
      developer: "إيكو هومز",
      description: "مجتمع مستدام مع منازل موفرة للطاقة ومساحات خضراء",
      thumbnail: "/placeholder.svg?height=300&width=500",
      featured: false,
    },
  ]);

  return (
    <div className="flex min-h-screen flex-col" dir="rtl">
      <DashboardHeader />
      <div className="flex flex-1 flex-col md:flex-row">
        <EnhancedSidebar activeTab="projects" setActiveTab={() => {}} />
        <main className="flex-1 p-4 md:p-6">
          <div className="space-y-6">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">
                  إدارة المشاريع
                </h1>
                <p className="text-muted-foreground">
                  إضافة وإدارة مشاريع التطوير العقاري لموقعك الإلكتروني
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-muted" : ""}
                >
                  <Grid3X3 className="h-4 w-4" />
                  <span className="sr-only">عرض الشبكة</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-muted" : ""}
                >
                  <List className="h-4 w-4" />
                  <span className="sr-only">عرض القائمة</span>
                </Button>
                <Button
                  variant="outline"
                  className="gap-1"
                  onClick={() => {
                    // Open filter dialog
                  }}
                >
                  <Filter className="h-4 w-4" />
                  تصفية
                </Button>
                <Button
                  className="gap-1"
                  onClick={() => router.push("/projects/add")}
                >
                  <Plus className="h-4 w-4" />
                  إضافة مشروع
                </Button>
              </div>
            </div>

            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">جميع المشاريع</TabsTrigger>
                <TabsTrigger value="published">منشور</TabsTrigger>
                <TabsTrigger value="drafts">مسودات</TabsTrigger>
                <TabsTrigger value="featured">مميز</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects.map((project) => (
                      <ProjectListItem key={project.id} project={project} />
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="published" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects
                      .filter((project) => project.status === "منشور")
                      .map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects
                      .filter((project) => project.status === "منشور")
                      .map((project) => (
                        <ProjectListItem key={project.id} project={project} />
                      ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="drafts" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects
                      .filter((project) => project.status === "مسودة")
                      .map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects
                      .filter((project) => project.status === "مسودة")
                      .map((project) => (
                        <ProjectListItem key={project.id} project={project} />
                      ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="featured" className="mt-4">
                {viewMode === "grid" ? (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {projects
                      .filter((project) => project.featured)
                      .map((project) => (
                        <ProjectCard key={project.id} project={project} />
                      ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {projects
                      .filter((project) => project.featured)
                      .map((project) => (
                        <ProjectListItem key={project.id} project={project} />
                      ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </div>
  );
}

function ProjectCard({ project }: { project: any }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative">
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={project.thumbnail || "/placeholder.svg"}
            alt={project.name}
            className="h-full w-full object-cover transition-all hover:scale-105"
          />
        </div>
        {project.featured && (
          <div className="absolute left-2 top-2 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
            مميز
          </div>
        )}
        <div
          className={`absolute right-2 top-2 rounded-md px-2 py-1 text-xs font-medium ${
            project.status === "منشور"
              ? "bg-green-500 text-white"
              : "bg-amber-500 text-white"
          }`}
        >
          {project.status}
        </div>
      </div>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="line-clamp-1">{project.name}</CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {project.location}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More options</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                تعديل
              </DropdownMenuItem>
              <DropdownMenuItem>
                <ExternalLink className="mr-2 h-4 w-4" />
                معاينة
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                نسخ
              </DropdownMenuItem>
              {project.status === "مسودة" ? (
                <DropdownMenuItem>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  نشر
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem>
                  <Edit className="mr-2 h-4 w-4" />
                  إلغاء النشر
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        <div className="text-lg font-semibold">{project.price}</div>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {project.description}
        </p>
        <div className="grid grid-cols-3 gap-2 text-sm">
          <div className="flex flex-col">
            <span className="text-muted-foreground">وحدات</span>
            <span className="font-medium flex items-center gap-1">
              <Users className="h-3 w-3" /> {project.units}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">الإنجاز</span>
            <span className="font-medium flex items-center gap-1">
              <Calendar className="h-3 w-3" /> {project.completionDate}
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-muted-foreground">المطور</span>
            <span className="font-medium flex items-center gap-1">
              <Building2 className="h-3 w-3" />{" "}
              {project.developer.split(" ")[0]}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full gap-1">
          <Edit className="h-3.5 w-3.5" />
          تعديل
        </Button>
        <Button size="sm" variant="secondary" className="w-full gap-1">
          <ExternalLink className="h-3.5 w-3.5" />
          معاينة
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProjectListItem({ project }: { project: any }) {
  return (
    <Card>
      <div className="flex flex-col sm:flex-row">
        <div className="relative sm:w-1/3 md:w-1/4">
          <div className="aspect-[16/9] sm:aspect-auto sm:h-full w-full overflow-hidden">
            <img
              src={project.thumbnail || "/placeholder.svg"}
              alt={project.name}
              className="h-full w-full object-cover"
            />
          </div>
          {project.featured && (
            <div className="absolute left-2 top-2 rounded-md bg-primary px-2 py-1 text-xs font-medium text-primary-foreground">
              مميز
            </div>
          )}
          <div
            className={`absolute right-2 top-2 rounded-md px-2 py-1 text-xs font-medium ${
              project.status === "منشور"
                ? "bg-green-500 text-white"
                : "bg-amber-500 text-white"
            }`}
          >
            {project.status}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold">{project.name}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" /> {project.location}
              </p>
            </div>
            <div className="text-lg font-semibold">{project.price}</div>
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          <div className="mt-auto pt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{project.units} وحدات</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>الإنجاز: {project.completionDate}</span>
            </div>
            <div className="flex items-center gap-1">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span>{project.developer}</span>
            </div>
            <div className="ml-auto flex gap-2">
              <Button variant="outline" size="sm">
                <Edit className="mr-1 h-3.5 w-3.5" />
                تعديل
              </Button>
              <Button variant="secondary" size="sm">
                <ExternalLink className="mr-1 h-3.5 w-3.5" />
                معاينة
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Copy className="mr-2 h-4 w-4" />
                    نسخ
                  </DropdownMenuItem>
                  {project.status === "مسودة" ? (
                    <DropdownMenuItem>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      نشر
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      إلغاء النشر
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem className="text-destructive focus:text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    حذف
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
