"use client";

import { useState } from "react";
import Link from "next/link";
import { EnhancedSidebar } from "@/components/enhanced-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Save, Upload } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function GeneralSettingsPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ الإعدادات العامة بنجاح",
      });
    }, 1000);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <DashboardHeader />
      <div className="flex flex-1">
        <EnhancedSidebar activeTab="content" />
        <main className="flex-1 p-6">
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/content">
                <Button variant="outline" size="icon" className="h-8 w-8 mr-2">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold">الإعدادات العامة</h1>
                <p className="text-muted-foreground">
                  تكوين المعلومات الأساسية لموقعك
                </p>
              </div>
            </div>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center gap-1">جاري الحفظ...</span>
              ) : (
                <span className="flex items-center gap-1">
                  <Save className="h-4 w-4 ml-1" />
                  حفظ التغييرات
                </span>
              )}
            </Button>
          </div>

          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>معلومات الموقع الأساسية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="site-name">اسم الموقع</Label>
                  <Input id="site-name" defaultValue="موقعي الرائع" />
                </div>
                <div>
                  <Label htmlFor="tagline">شعار الموقع</Label>
                  <Input id="tagline" defaultValue="أفضل موقع على الإطلاق" />
                </div>
                <div>
                  <Label htmlFor="description">وصف الموقع</Label>
                  <Textarea
                    id="description"
                    defaultValue="هذا وصف لموقعي الرائع. سيظهر في نتائج البحث ومشاركات وسائل التواصل الاجتماعي."
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    هذا الوصف سيظهر في نتائج البحث ومشاركات وسائل التواصل
                    الاجتماعي.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>شعار الموقع</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>شعار الموقع</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="h-20 w-20 rounded-md border flex items-center justify-center bg-muted">
                      <span className="text-sm text-muted-foreground">
                        الشعار
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Upload className="h-4 w-4 ml-1" />
                      رفع شعار جديد
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    يفضل استخدام صورة بخلفية شفافة بصيغة PNG أو SVG. الحجم
                    المثالي: 200×60 بكسل.
                  </p>
                </div>

                <div>
                  <Label>أيقونة الموقع (Favicon)</Label>
                  <div className="mt-2 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-md border flex items-center justify-center bg-muted">
                      <span className="text-xs text-muted-foreground">
                        أيقونة
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      <Upload className="h-4 w-4 ml-1" />
                      رفع أيقونة جديدة
                    </Button>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    يفضل استخدام صورة مربعة بصيغة PNG أو ICO. الحجم المثالي:
                    32×32 بكسل.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>إعدادات إضافية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="maintenance-mode">وضع الصيانة</Label>
                    <p className="text-sm text-muted-foreground">
                      عند تفعيل هذا الخيار، سيرى الزوار صفحة صيانة بدلاً من
                      موقعك
                    </p>
                  </div>
                  <Switch id="maintenance-mode" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="show-breadcrumb">
                      إظهار شريط التنقل (Breadcrumb)
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      إظهار شريط التنقل في الصفحات الفرعية لمساعدة الزوار على
                      التنقل
                    </p>
                  </div>
                  <Switch id="show-breadcrumb" defaultChecked />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
