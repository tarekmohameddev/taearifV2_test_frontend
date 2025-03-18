"use client";

import { useState } from "react";
import {
  Copy,
  Edit,
  ExternalLink,
  MoreHorizontal,
  Plus,
  Settings,
  Trash2,
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function WebsitesList() {
  const [websites, setWebsites] = useState([
    {
      id: "1",
      name: "موقعي الشخصي",
      domain: "portfolio.taearif.com",
      status: "منشور",
      lastUpdated: "منذ يومين",
      visitors: 1245,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "2",
      name: "موقع الشركة",
      domain: "business.taearif.com",
      status: "منشور",
      lastUpdated: "منذ أسبوع",
      visitors: 3456,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
    {
      id: "3",
      name: "المدونة",
      domain: "blog.taearif.com",
      status: "مسودة",
      lastUpdated: "منذ 3 أيام",
      visitors: 0,
      thumbnail: "/placeholder.svg?height=200&width=300",
    },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">المواقع</h1>
          <p className="text-muted-foreground">إدارة وتعديل مواقعك</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-1">
              <Plus className="h-4 w-4" />
              موقع جديد
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>إنشاء موقع جديد</DialogTitle>
              <DialogDescription>أدخل تفاصيل موقعك الجديد</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">اسم الموقع</Label>
                <Input id="name" placeholder="موقعي الرائع" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="domain">النطاق</Label>
                <Input id="domain" placeholder="mywebsite.taearif.com" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">إلغاء</Button>
              <Button>إنشاء موقع</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">جميع المواقع</TabsTrigger>
          <TabsTrigger value="published">المنشورة</TabsTrigger>
          <TabsTrigger value="drafts">المسودات</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {websites.map((website) => (
              <WebsiteCard key={website.id} website={website} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="published" className="mt-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {websites
              .filter((website) => website.status === "منشور")
              .map((website) => (
                <WebsiteCard key={website.id} website={website} />
              ))}
          </div>
        </TabsContent>
        <TabsContent value="drafts" className="mt-4">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {websites
              .filter((website) => website.status === "مسودة")
              .map((website) => (
                <WebsiteCard key={website.id} website={website} />
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function WebsiteCard({ website }: { website: any }) {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={website.thumbnail || "/placeholder.svg"}
          alt={website.name}
          className="h-full w-full object-cover transition-all hover:scale-105"
        />
      </div>
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="line-clamp-1">{website.name}</CardTitle>
            <CardDescription className="line-clamp-1">
              {website.domain}
            </CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="-mr-2">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">خيارات إضافية</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                تعديل
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                الإعدادات
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Copy className="mr-2 h-4 w-4" />
                نسخ
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive focus:text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                حذف
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span
              className={`h-2 w-2 rounded-full ${website.status === "منشور" ? "bg-green-500" : "bg-amber-500"}`}
            />
            <span>{website.status}</span>
          </div>
          <div>تم التحديث {website.lastUpdated}</div>
        </div>
        {website.status === "منشور" && (
          <div className="mt-2 text-sm">
            <span className="font-medium">
              {website.visitors.toLocaleString()}
            </span>{" "}
            <span className="text-muted-foreground">زائر</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex gap-2 p-4 pt-0">
        <Button variant="outline" size="sm" className="w-full gap-1">
          <Edit className="h-3.5 w-3.5" />
          تعديل
        </Button>
        {website.status === "منشور" && (
          <Button size="sm" variant="secondary" className="w-full gap-1">
            <ExternalLink className="h-3.5 w-3.5" />
            زيارة
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
