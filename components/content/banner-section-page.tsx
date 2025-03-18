"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { EnhancedSidebar } from "@/components/enhanced-sidebar";
import { DashboardHeader } from "@/components/dashboard-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ImagePlus, Plus, Save, Trash2, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function BannerSectionPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [bannerType, setBannerType] = useState("static");
  const [staticBannerImage, setStaticBannerImage] = useState(null);
  const staticFileInputRef = useRef(null);

  const [sliders, setSliders] = useState([
    {
      id: 1,
      title: "مرحبًا بك في موقعي",
      subtitle: "أفضل مكان للعثور على ما تحتاجه",
      description: "هذا وصف تفصيلي سيظهر في قسم البانر من موقعك. اجعله جذابًا!",
      hasButton: true,
      buttonText: "ابدأ الآن",
      buttonLink: "/contact",
      image: null,
    },
    {
      id: 2,
      title: "خدماتنا المميزة",
      subtitle: "نقدم أفضل الخدمات لعملائنا",
      description:
        "استكشف مجموعة الخدمات المتميزة التي نقدمها لتلبية احتياجاتك.",
      hasButton: true,
      buttonText: "استكشف خدماتنا",
      buttonLink: "/services",
      image: null,
    },
  ]);

  const handleSave = () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "تم الحفظ بنجاح",
        description: "تم حفظ إعدادات البانر بنجاح",
      });
    }, 1000);
  };

  const addNewSlide = () => {
    const newId =
      sliders.length > 0 ? Math.max(...sliders.map((s) => s.id)) + 1 : 1;
    setSliders([
      ...sliders,
      {
        id: newId,
        title: "عنوان جديد",
        subtitle: "عنوان فرعي جديد",
        description: "وصف الشريحة الجديدة",
        hasButton: true,
        buttonText: "اضغط هنا",
        buttonLink: "/",
        image: null,
      },
    ]);
  };

  const removeSlide = (id) => {
    setSliders(sliders.filter((slide) => slide.id !== id));
  };

  const updateSlide = (id, field, value) => {
    setSliders(
      sliders.map((slide) =>
        slide.id === id ? { ...slide, [field]: value } : slide,
      ),
    );
  };

  const handleStaticImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setStaticBannerImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSlideImageUpload = (id, e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateSlide(id, "image", e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeStaticImage = () => {
    setStaticBannerImage(null);
    if (staticFileInputRef.current) {
      staticFileInputRef.current.value = "";
    }
  };

  const removeSlideImage = (id) => {
    updateSlide(id, "image", null);
    // Reset the file input
    const fileInput = document.getElementById(`slide-image-input-${id}`);
    if (fileInput) {
      fileInput.value = "";
    }
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
                <h1 className="text-2xl font-bold">قسم البانر</h1>
                <p className="text-muted-foreground">
                  تكوين قسم البانر الرئيسي لموقعك
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
                <CardTitle>نوع البانر</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col space-y-4">
                  <div className="flex items-center space-x-4 space-x-reverse">
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="static-banner"
                        name="banner-type"
                        className="h-4 w-4 text-primary"
                        checked={bannerType === "static"}
                        onChange={() => setBannerType("static")}
                      />
                      <Label htmlFor="static-banner" className="mr-2">
                        بانر ثابت
                      </Label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="radio"
                        id="slider-banner"
                        name="banner-type"
                        className="h-4 w-4 text-primary"
                        checked={bannerType === "slider"}
                        onChange={() => setBannerType("slider")}
                      />
                      <Label htmlFor="slider-banner" className="mr-2">
                        بانر متحرك (سلايدر)
                      </Label>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    البانر الثابت يعرض صورة واحدة مع نص، بينما البانر المتحرك
                    يعرض عدة شرائح متغيرة.
                  </p>
                </div>
              </CardContent>
            </Card>

            {bannerType === "static" ? (
              <Card>
                <CardHeader>
                  <CardTitle>محتوى البانر الثابت</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="banner-title">عنوان البانر</Label>
                    <Input
                      id="banner-title"
                      defaultValue="مرحبًا بك في موقعي"
                    />
                  </div>
                  <div>
                    <Label htmlFor="banner-subtitle">
                      العنوان الفرعي للبانر
                    </Label>
                    <Input
                      id="banner-subtitle"
                      defaultValue="أفضل مكان للعثور على ما تحتاجه"
                    />
                  </div>
                  <div>
                    <Label htmlFor="banner-description">وصف البانر</Label>
                    <Textarea
                      id="banner-description"
                      defaultValue="هذا وصف تفصيلي سيظهر في قسم البانر من موقعك. اجعله جذابًا!"
                    />
                  </div>
                  <div>
                    <Label>صورة البانر</Label>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      ref={staticFileInputRef}
                      onChange={handleStaticImageUpload}
                      id="static-banner-image"
                    />
                    {staticBannerImage ? (
                      <div className="mt-2 relative">
                        <div className="relative h-40 w-full rounded-md overflow-hidden">
                          <Image
                            src={staticBannerImage || "/placeholder.svg"}
                            alt="صورة البانر"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <Button
                          variant="destructive"
                          size="icon"
                          className="absolute top-2 left-2 h-8 w-8"
                          onClick={removeStaticImage}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div
                        className="mt-2 flex h-40 cursor-pointer items-center justify-center rounded-md border border-dashed"
                        onClick={() =>
                          document.getElementById("static-banner-image").click()
                        }
                      >
                        <div className="flex flex-col items-center gap-1 text-muted-foreground">
                          <ImagePlus className="h-8 w-8" />
                          <span>انقر لرفع صورة</span>
                          <span className="text-xs">
                            الحجم الموصى به: 1920×1080 بكسل
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="show-cta">عرض زر الدعوة للعمل</Label>
                      <p className="text-sm text-muted-foreground">
                        عرض زر دعوة للعمل في البانر
                      </p>
                    </div>
                    <Switch id="show-cta" defaultChecked />
                  </div>
                  <div>
                    <Label htmlFor="cta-text">نص الزر</Label>
                    <Input id="cta-text" defaultValue="ابدأ الآن" />
                  </div>
                  <div>
                    <Label htmlFor="cta-link">رابط الزر</Label>
                    <Input id="cta-link" defaultValue="/contact" />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium">شرائح البانر المتحرك</h3>
                  <Button
                    onClick={addNewSlide}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4 ml-1" />
                    إضافة شريحة جديدة
                  </Button>
                </div>

                <Tabs
                  defaultValue={`slide-${sliders[0]?.id}`}
                  className="w-full"
                >
                  <TabsList className="mb-4 flex flex-wrap">
                    {sliders.map((slide, index) => (
                      <TabsTrigger
                        key={slide.id}
                        value={`slide-${slide.id}`}
                        className="relative"
                      >
                        الشريحة {index + 1}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {sliders.map((slide, index) => (
                    <TabsContent key={slide.id} value={`slide-${slide.id}`}>
                      <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                          <CardTitle>الشريحة {index + 1}</CardTitle>
                          {sliders.length > 1 && (
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => removeSlide(slide.id)}
                              className="flex items-center gap-1"
                            >
                              <Trash2 className="h-4 w-4 ml-1" />
                              حذف الشريحة
                            </Button>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label htmlFor={`slide-title-${slide.id}`}>
                              عنوان الشريحة
                            </Label>
                            <Input
                              id={`slide-title-${slide.id}`}
                              value={slide.title}
                              onChange={(e) =>
                                updateSlide(slide.id, "title", e.target.value)
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor={`slide-subtitle-${slide.id}`}>
                              العنوان الفرعي
                            </Label>
                            <Input
                              id={`slide-subtitle-${slide.id}`}
                              value={slide.subtitle}
                              onChange={(e) =>
                                updateSlide(
                                  slide.id,
                                  "subtitle",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label htmlFor={`slide-description-${slide.id}`}>
                              وصف الشريحة
                            </Label>
                            <Textarea
                              id={`slide-description-${slide.id}`}
                              value={slide.description}
                              onChange={(e) =>
                                updateSlide(
                                  slide.id,
                                  "description",
                                  e.target.value,
                                )
                              }
                            />
                          </div>
                          <div>
                            <Label>صورة الشريحة</Label>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              id={`slide-image-input-${slide.id}`}
                              onChange={(e) =>
                                handleSlideImageUpload(slide.id, e)
                              }
                            />
                            {slide.image ? (
                              <div className="mt-2 relative">
                                <div className="relative h-40 w-full rounded-md overflow-hidden">
                                  <Image
                                    src={slide.image || "/placeholder.svg"}
                                    alt={`صورة الشريحة ${index + 1}`}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                                <Button
                                  variant="destructive"
                                  size="icon"
                                  className="absolute top-2 left-2 h-8 w-8"
                                  onClick={() => removeSlideImage(slide.id)}
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            ) : (
                              <div
                                className="mt-2 flex h-40 cursor-pointer items-center justify-center rounded-md border border-dashed"
                                onClick={() =>
                                  document
                                    .getElementById(
                                      `slide-image-input-${slide.id}`,
                                    )
                                    .click()
                                }
                              >
                                <div className="flex flex-col items-center gap-1 text-muted-foreground">
                                  <ImagePlus className="h-8 w-8" />
                                  <span>انقر لرفع صورة</span>
                                  <span className="text-xs">
                                    الحجم الموصى به: 1920×1080 بكسل
                                  </span>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <Label htmlFor={`slide-show-button-${slide.id}`}>
                                عرض زر
                              </Label>
                              <p className="text-sm text-muted-foreground">
                                عرض زر في هذه الشريحة
                              </p>
                            </div>
                            <Switch
                              id={`slide-show-button-${slide.id}`}
                              checked={slide.hasButton}
                              onCheckedChange={(checked) =>
                                updateSlide(slide.id, "hasButton", checked)
                              }
                            />
                          </div>
                          {slide.hasButton && (
                            <>
                              <div>
                                <Label
                                  htmlFor={`slide-button-text-${slide.id}`}
                                >
                                  نص الزر
                                </Label>
                                <Input
                                  id={`slide-button-text-${slide.id}`}
                                  value={slide.buttonText}
                                  onChange={(e) =>
                                    updateSlide(
                                      slide.id,
                                      "buttonText",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                              <div>
                                <Label
                                  htmlFor={`slide-button-link-${slide.id}`}
                                >
                                  رابط الزر
                                </Label>
                                <Input
                                  id={`slide-button-link-${slide.id}`}
                                  value={slide.buttonLink}
                                  onChange={(e) =>
                                    updateSlide(
                                      slide.id,
                                      "buttonLink",
                                      e.target.value,
                                    )
                                  }
                                />
                              </div>
                            </>
                          )}
                        </CardContent>
                      </Card>
                    </TabsContent>
                  ))}
                </Tabs>

                <Card>
                  <CardHeader>
                    <CardTitle>إعدادات السلايدر</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="auto-play">تشغيل تلقائي</Label>
                        <p className="text-sm text-muted-foreground">
                          تغيير الشرائح تلقائيًا
                        </p>
                      </div>
                      <Switch id="auto-play" defaultChecked />
                    </div>
                    <div>
                      <Label htmlFor="slide-interval">
                        الفاصل الزمني (بالثواني)
                      </Label>
                      <Input
                        id="slide-interval"
                        type="number"
                        defaultValue="5"
                        min="1"
                        max="20"
                      />
                      <p className="mt-1 text-xs text-muted-foreground">
                        المدة الزمنية بين كل شريحة والتي تليها (بالثواني)
                      </p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-arrows">عرض أسهم التنقل</Label>
                        <p className="text-sm text-muted-foreground">
                          عرض أسهم للتنقل بين الشرائح
                        </p>
                      </div>
                      <Switch id="show-arrows" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="show-dots">عرض نقاط التنقل</Label>
                        <p className="text-sm text-muted-foreground">
                          عرض نقاط للتنقل بين الشرائح
                        </p>
                      </div>
                      <Switch id="show-dots" defaultChecked />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
