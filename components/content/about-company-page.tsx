"use client";

import { useState } from "react";
import Link from "next/link";
import { EnhancedSidebar } from "@/components/enhanced-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ImagePlus, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function AboutCompanyPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [features, setFeatures] = useState([
    {
      id: 1,
      title: "الجودة",
      description: "نلتزم بتقديم أعلى معايير الجودة في جميع منتجاتنا وخدماتنا.",
    },
    {
      id: 2,
      title: "الابتكار",
      description:
        "نسعى دائمًا لتطوير حلول مبتكرة تلبي احتياجات عملائنا المتغيرة.",
    },
    {
      id: 3,
      title: "الموثوقية",
      description:
        "يمكنك الاعتماد علينا لتقديم النتائج في الوقت المحدد وبالميزانية المتفق عليها.",
    },
  ]);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ معلومات الشركة بنجاح",
      });
    }, 1000);
  };

  const addNewFeature = () => {
    const newId =
      features.length > 0 ? Math.max(...features.map((f) => f.id)) + 1 : 1;
    setFeatures([
      ...features,
      {
        id: newId,
        title: "ميزة جديدة",
        description: "وصف الميزة الجديدة",
      },
    ]);
  };

  const removeFeature = (id) => {
    setFeatures(features.filter((feature) => feature.id !== id));
  };

  const updateFeature = (id, field, value) => {
    setFeatures(
      features.map((feature) =>
        feature.id === id ? { ...feature, [field]: value } : feature,
      ),
    );
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
                <h1 className="text-2xl font-bold">من نحن</h1>
                <p className="text-muted-foreground">
                  أخبر زوارك عن شركتك ورسالتها
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
                <CardTitle>عنوان القسم</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="about-title">عنوان القسم</Label>
                  <Input id="about-title" defaultValue="عن شركتنا" />
                </div>
                <div>
                  <Label htmlFor="about-subtitle">العنوان الفرعي للقسم</Label>
                  <Input id="about-subtitle" defaultValue="قصتنا ورسالتنا" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>معلومات الشركة</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="company-history">تاريخ الشركة</Label>
                  <Textarea
                    id="company-history"
                    className="min-h-[150px]"
                    defaultValue="تأسست شركتنا في عام 2010، ونمت من شركة ناشئة صغيرة إلى مزود رائد في مجالنا. لقد التزمنا دائمًا بالجودة والابتكار."
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    اشرح كيف بدأت شركتك وكيف تطورت على مر السنين
                  </p>
                </div>
                <div>
                  <Label htmlFor="company-mission">رسالة الشركة</Label>
                  <Textarea
                    id="company-mission"
                    className="min-h-[100px]"
                    defaultValue="مهمتنا هي تقديم منتجات وخدمات استثنائية تحسن حياة عملائنا مع الحفاظ على أعلى معايير الجودة ورضا العملاء."
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    اشرح رسالة شركتك وما تسعى لتحقيقه
                  </p>
                </div>
                <div>
                  <Label htmlFor="company-vision">رؤية الشركة</Label>
                  <Textarea
                    id="company-vision"
                    className="min-h-[100px]"
                    defaultValue="نتطلع إلى أن نصبح الشركة الرائدة في مجالنا، معروفين بالابتكار والجودة والخدمة الاستثنائية للعملاء."
                  />
                  <p className="mt-1 text-xs text-muted-foreground">
                    اشرح رؤيتك المستقبلية للشركة
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>صورة الشركة</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label>صورة الشركة</Label>
                  <div className="mt-2 flex h-40 cursor-pointer items-center justify-center rounded-md border border-dashed">
                    <div className="flex flex-col items-center gap-1 text-muted-foreground">
                      <ImagePlus className="h-8 w-8" />
                      <span>انقر لرفع صورة</span>
                      <span className="text-xs">
                        الحجم الموصى به: 800×600 بكسل
                      </span>
                    </div>
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground">
                    اختر صورة تعبر عن شركتك، مثل صورة للفريق أو المكتب أو شعار
                    الشركة
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">مميزات الشركة</h3>
              <Button
                onClick={addNewFeature}
                className="flex items-center gap-1"
              >
                <Plus className="h-4 w-4 ml-1" />
                إضافة ميزة
              </Button>
            </div>

            <div className="space-y-4">
              {features.map((feature) => (
                <Card key={feature.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 space-y-3">
                        <div>
                          <Label htmlFor={`feature-title-${feature.id}`}>
                            عنوان الميزة
                          </Label>
                          <Input
                            id={`feature-title-${feature.id}`}
                            value={feature.title}
                            onChange={(e) =>
                              updateFeature(feature.id, "title", e.target.value)
                            }
                          />
                        </div>
                        <div>
                          <Label htmlFor={`feature-description-${feature.id}`}>
                            وصف الميزة
                          </Label>
                          <Textarea
                            id={`feature-description-${feature.id}`}
                            value={feature.description}
                            onChange={(e) =>
                              updateFeature(
                                feature.id,
                                "description",
                                e.target.value,
                              )
                            }
                          />
                        </div>
                      </div>
                      {features.length > 1 && (
                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() => removeFeature(feature.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
