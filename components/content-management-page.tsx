"use client";

import { DialogTrigger } from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { EnhancedSidebar } from "@/components/enhanced-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Globe,
  ImageIcon,
  MessageSquare,
  Plus,
  Settings2,
  Briefcase,
  Clock,
  Filter,
  Award,
  Layers,
  ThumbsUp,
  FolderKanban,
  Lightbulb,
  ShoppingBag,
  Menu,
  Trophy,
  Star,
  FileText,
  LayoutTemplateIcon as LayoutFooter,
} from "lucide-react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export function ContentManagementPage() {
  const [newSectionDialogOpen, setNewSectionDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all"); // "all", "active", "inactive"
  const [searchQuery, setSearchQuery] = useState("");

  // New section form state
  const [newSectionName, setNewSectionName] = useState("");
  const [newSectionDescription, setNewSectionDescription] = useState("");
  const [newSectionStatus, setNewSectionStatus] = useState(true);
  const [newSectionIcon, setNewSectionIcon] = useState("FileText");

  // Available icons for new sections
  const availableIcons = {
    FileText: FileText,
    Briefcase: Briefcase,
    ImageIcon: ImageIcon,
    Building2: Building2,
    MessageSquare: MessageSquare,
    Award: Award,
    Layers: Layers,
    ThumbsUp: ThumbsUp,
    FolderKanban: FolderKanban,
    Lightbulb: Lightbulb,
    ShoppingBag: ShoppingBag,
    Menu: Menu,
    Trophy: Trophy,
    Star: Star,
    LayoutFooter: LayoutFooter,
  };
  import axiosInstance from "@/lib/axiosInstance";

  const [sections, setSections] = useState([
    {
      id: "general",
      title: "الإعدادات العامة",
      description: "اسم الموقع، الشعار ومعلومات الاتصال",
      icon: Settings2,
      path: "/content/general",
      status: "active",
      lastUpdate: "آخر تحديث منذ يومين",
      info: {
        email: "info@mycompany.com",
        website: "mycompany.com",
      },
    },
    {
      id: "banner",
      title: "البانر الرئيسي",
      description: "إدارة البانر الرئيسي للموقع",
      icon: ImageIcon,
      path: "/content/banner",
      status: "active",
      lastUpdate: "آخر تحديث منذ يوم واحد",
      badge: {
        label: "قسم نشط",
        color: "bg-rose-100 text-rose-800",
      },
    },
    {
      id: "footer",
      title: "تذييل الصفحة",
      description: "تخصيص تذييل الموقع ومعلومات الاتصال",
      icon: LayoutFooter,
      path: "/content/footer",
      status: "active",
      lastUpdate: "آخر تحديث منذ 3 أيام",
      badge: {
        label: "قسم نشط",
        color: "bg-blue-100 text-blue-800",
      },
    },
    {
      id: "services",
      title: "خدماتنا",
      description: "إدارة خدمات شركتك",
      icon: Briefcase,
      path: "/content/services",
      status: "active",
      count: 2,
      lastUpdate: "آخر تحديث منذ يومين",
      badge: {
        label: "الخدمات النشطة",
        color: "bg-purple-100 text-purple-800",
      },
    },
    {
      id: "gallery",
      title: "معرض الصور",
      description: "عرض أعمالك بالصور",
      icon: ImageIcon,
      path: "/content/gallery",
      status: "inactive",
      count: 4,
      lastUpdate: "آخر تحديث منذ 5 أيام",
      badge: {
        label: "الصور في المعرض",
        color: "bg-green-100 text-green-800",
      },
    },
    {
      id: "about",
      title: "عن الشركة",
      description: "معلومات عن شركتك ورسالتها",
      icon: Building2,
      path: "/content/about",
      status: "active",
      lastUpdate: "آخر تحديث منذ 3 أيام",
      badge: {
        label: "قسم نشط",
        color: "bg-blue-100 text-blue-800",
      },
    },
    {
      id: "testimonials",
      title: "آراء العملاء",
      description: "شهادات من عملائك",
      icon: MessageSquare,
      path: "/content/testimonials",
      status: "inactive",
      count: 2,
      lastUpdate: "آخر تحديث منذ أسبوع",
      badge: {
        label: "المراجعات النشطة",
        color: "bg-yellow-100 text-yellow-800",
      },
    },
    {
      id: "skills",
      title: "قسم المهارات",
      description: "عرض مهارات الفريق والشركة",
      icon: Award,
      path: "/content/skills",
      status: "active",
      count: 5,
      lastUpdate: "آخر تحديث منذ 3 أيام",
      badge: {
        label: "المهارات النشطة",
        color: "bg-indigo-100 text-indigo-800",
      },
    },
    {
      id: "portfolio",
      title: "معرض الأعمال",
      description: "عرض مشاريعك وأعمالك السابقة",
      icon: FolderKanban,
      path: "/content/portfolio",
      status: "active",
      count: 8,
      lastUpdate: "آخر تحديث منذ أسبوع",
      badge: {
        label: "المشاريع المعروضة",
        color: "bg-pink-100 text-pink-800",
      },
    },
    {
      id: "categories",
      title: "التصنيفات",
      description: "إدارة تصنيفات المحتوى والمنتجات",
      icon: Layers,
      path: "/content/categories",
      status: "active",
      count: 6,
      lastUpdate: "آخر تحديث منذ 4 أيام",
      badge: {
        label: "التصنيفات النشطة",
        color: "bg-orange-100 text-orange-800",
      },
    },
    {
      id: "why-choose-us",
      title: "لماذا تختارنا",
      description: "أسباب تميزنا عن المنافسين",
      icon: ThumbsUp,
      path: "/content/why-choose-us",
      status: "inactive",
      count: 4,
      lastUpdate: "آخر تحديث منذ أسبوعين",
      badge: {
        label: "الميزات المعروضة",
        color: "bg-teal-100 text-teal-800",
      },
    },
    {
      id: "brands",
      title: "العلامات التجارية",
      description: "إدارة العلامات التجارية والشركاء",
      icon: ShoppingBag,
      path: "/content/brands",
      status: "active",
      count: 7,
      lastUpdate: "آخر تحديث منذ 5 أيام",
      badge: {
        label: "العلامات النشطة",
        color: "bg-cyan-100 text-cyan-800",
      },
    },
    {
      id: "menu",
      title: "إدارة القائمة",
      description: "تخصيص قائمة الموقع وترتيبها",
      icon: Menu,
      path: "/content/menu",
      status: "active",
      count: 8,
      lastUpdate: "آخر تحديث منذ يوم واحد",
      badge: {
        label: "عناصر القائمة",
        color: "bg-violet-100 text-violet-800",
      },
    },
    {
      id: "achievements",
      title: "الإنجازات",
      description: "عرض إنجازات وجوائز الشركة",
      icon: Trophy,
      path: "/content/achievements",
      status: "active",
      count: 3,
      lastUpdate: "آخر تحديث منذ 6 أيام",
      badge: {
        label: "الإنجازات المعروضة",
        color: "bg-amber-100 text-amber-800",
      },
    },
  ]);


  const fetchSections= async () => {
    try {
      const response = await axiosInstance.get(
        "https://taearif.com/api/content/sections",
      );
      console.log(" response.data:", response.data);
      // setSections(response.data.data); // تحديث الحالة بالبيانات المسترجعة
    } catch (error) {
      console.error("Error fetching dashboard traffic-sources:", error);
      setError(error.message || "حدث خطأ أثناء جلب اجهزة اللوحة");
    }
  };
  
  
  
  
  useEffect(() => {
    fetchSections();
  }, []);


  const toggleSectionStatus = (id) => {
    setSections(
      sections.map((section) => {
        if (section.id === id) {
          return {
            ...section,
            status: section.status === "active" ? "inactive" : "active",
          };
        }
        return section;
      }),
    );
  };

  const handleAddNewSection = () => {
    if (!newSectionName.trim()) {
      toast({
        title: "خطأ",
        description: "يرجى إدخال اسم للقسم",
        variant: "destructive",
      });
      return;
    }

    // Generate a unique ID based on the section name
    const newId = newSectionName
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "")
      .replace(/--+/g, "-")
      .trim();

    // Generate a random color for the badge
    const colors = [
      "bg-red-100 text-red-800",
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-yellow-100 text-yellow-800",
      "bg-purple-100 text-purple-800",
      "bg-pink-100 text-pink-800",
      "bg-indigo-100 text-indigo-800",
      "bg-teal-100 text-teal-800",
      "bg-orange-100 text-orange-800",
      "bg-cyan-100 text-cyan-800",
      "bg-amber-100 text-amber-800",
      "bg-violet-100 text-violet-800",
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    // Create the new section
    const newSection = {
      id: newId,
      title: newSectionName,
      description: newSectionDescription || "قسم مخصص",
      icon: availableIcons[newSectionIcon],
      path: `/content/${newId}`,
      status: newSectionStatus ? "active" : "inactive",
      count: 0,
      lastUpdate: "آخر تحديث الآن",
      badge: {
        label: "العناصر",
        color: randomColor,
      },
    };

    // Add the new section to the sections array
    setSections([...sections, newSection]);

    // Reset form fields
    setNewSectionName("");
    setNewSectionDescription("");
    setNewSectionStatus(true);
    setNewSectionIcon("FileText");

    // Close the dialog
    setNewSectionDialogOpen(false);

    // Show success toast
    toast({
      title: "تم إضافة القسم بنجاح",
      description: `تم إضافة قسم "${newSectionName}" بنجاح`,
    });
  };

  const filteredSections = sections.filter((section) => {
    // Apply status filter
    if (statusFilter !== "all" && section.status !== statusFilter) {
      return false;
    }

    // Apply search filter
    if (
      searchQuery &&
      !section.title.includes(searchQuery) &&
      !section.description.includes(searchQuery)
    ) {
      return false;
    }

    return true;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <EnhancedSidebar activeTab="content" setActiveTab={() => {}} />
        <main className="flex-1 p-6">
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">إدارة المحتوى</h1>
                <p className="text-muted-foreground">تخصيص محتوى موقعك</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative">
                  <Input
                    placeholder="بحث في الأقسام..."
                    className="w-[200px] pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <SearchIcon className="absolute right-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                </div>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <div className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <SelectValue placeholder="تصفية حسب الحالة" />
                    </div>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">جميع الأقسام</SelectItem>
                    <SelectItem value="active">الأقسام النشطة</SelectItem>
                    <SelectItem value="inactive">الأقسام غير النشطة</SelectItem>
                  </SelectContent>
                </Select>

                <Dialog
                  open={newSectionDialogOpen}
                  onOpenChange={setNewSectionDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button onClick={() => setNewSectionDialogOpen(true)}>
                      <Plus className="h-4 w-4 ml-1" />
                      إضافة قسم
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>إضافة قسم جديد</DialogTitle>
                      <DialogDescription>
                        أضف قسمًا مخصصًا جديدًا إلى موقعك
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">اسم القسم</Label>
                        <Input
                          id="name"
                          placeholder="مثال: المدونة، الوظائف، الأسئلة الشائعة"
                          value={newSectionName}
                          onChange={(e) => setNewSectionName(e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="description">وصف القسم</Label>
                        <Textarea
                          id="description"
                          placeholder="وصف مختصر لمحتوى القسم وهدفه"
                          value={newSectionDescription}
                          onChange={(e) =>
                            setNewSectionDescription(e.target.value)
                          }
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="icon">أيقونة القسم</Label>
                        <Select
                          value={newSectionIcon}
                          onValueChange={setNewSectionIcon}
                        >
                          <SelectTrigger id="icon">
                            <SelectValue placeholder="اختر أيقونة" />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.entries(availableIcons).map(
                              ([name, Icon]) => (
                                <SelectItem key={name} value={name}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4" />
                                    <span>{name}</span>
                                  </div>
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="status">حالة القسم</Label>
                        <div className="flex items-center gap-2">
                          <Label htmlFor="status" className="text-sm">
                            نشط
                          </Label>
                          <Switch
                            id="status"
                            checked={newSectionStatus}
                            onCheckedChange={setNewSectionStatus}
                          />
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setNewSectionDialogOpen(false)}
                      >
                        إلغاء
                      </Button>
                      <Button onClick={handleAddNewSection}>إضافة القسم</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          {filteredSections.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <div className="rounded-full bg-muted p-3 mb-4">
                <Filter className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-1">لا توجد أقسام مطابقة</h3>
              <p className="text-muted-foreground mb-4">
                لم يتم العثور على أقسام تطابق معايير التصفية الحالية
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setStatusFilter("all");
                  setSearchQuery("");
                }}
              >
                عرض جميع الأقسام
              </Button>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredSections.map((section) => (
                <Link href={section.path} key={section.id}>
                  <Card
                    className={`h-full cursor-pointer transition-all hover:shadow-md ${
                      section.status === "inactive"
                        ? "opacity-70 border-dashed"
                        : ""
                    }`}
                  >
                    <CardHeader className="flex flex-row items-start justify-between p-6">
                      <div className="flex flex-col gap-1">
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <section.icon className="h-5 w-5 text-muted-foreground" />
                          {section.title}
                          {section.status === "active" ? (
                            <Badge
                              variant="outline"
                              className="bg-green-50 text-green-700 border-green-200 ml-2"
                            >
                              نشط
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="bg-gray-50 text-gray-700 border-gray-200 ml-2"
                            >
                              غير نشط
                            </Badge>
                          )}
                        </CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                      </div>
                    </CardHeader>
                    <CardContent className="px-6 pb-6">
                      {section.count !== undefined && (
                        <Badge
                          variant="secondary"
                          className={`mb-4 ${section.badge?.color}`}
                        >
                          {section.count} {section.badge?.label}
                        </Badge>
                      )}
                      {section.info && (
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Globe className="h-4 w-4" />
                            <span>{section.info.website}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MessageSquare className="h-4 w-4" />
                            <span>{section.info.email}</span>
                          </div>
                        </div>
                      )}
                      <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>{section.lastUpdate}</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}

              <Card
                className="flex h-full cursor-pointer flex-col items-center justify-center border-dashed p-6 text-center transition-colors hover:bg-muted/50"
                onClick={() => setNewSectionDialogOpen(true)}
              >
                <div className="mb-4 rounded-full bg-primary/10 p-3">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-1 font-medium">إضافة قسم مخصص</h3>
                <p className="text-sm text-muted-foreground">
                  إنشاء قسم مخصص جديد لموقعك
                </p>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
