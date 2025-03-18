"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Upload,
  Info,
  Trash2,
  Palette,
  Layout,
  Home,
  FileImage,
  Check,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

// Define the website categories
const WEBSITE_CATEGORIES = [
  {
    id: "personal",
    title: "شخصي",
    description: "موقع شخصي، سيرة ذاتية، مدونة",
    icon: "/category-personal.svg",
  },
  {
    id: "realestate",
    title: "عقارات",
    description: "شركة عقارية، مكتب عقاري، مشاريع سكنية",
    icon: "/category-realestate.svg",
  },
  {
    id: "lawyer",
    title: "محاماة",
    description: "مكتب محاماة، استشارات قانونية",
    icon: "/category-lawyer.svg",
  },
];

// Predefined color palettes
const COLOR_PALETTES = [
  { primary: "#1e40af", secondary: "#3b82f6", accent: "#93c5fd" },
  { primary: "#047857", secondary: "#10b981", accent: "#6ee7b7" },
  { primary: "#7c2d12", secondary: "#ea580c", accent: "#fdba74" },
  { primary: "#4c1d95", secondary: "#8b5cf6", accent: "#c4b5fd" },
  { primary: "#0f172a", secondary: "#334155", accent: "#94a3b8" },
];

// Define the steps of the onboarding process
const STEPS = [
  { id: "welcome", title: "مرحباً بك" },
  { id: "title", title: "عنوان الموقع" },
  { id: "logo", title: "شعار الموقع" },
  { id: "favicon", title: "أيقونة الموقع" },
  { id: "category", title: "نوع الموقع" },
  { id: "colors", title: "ألوان الموقع" },
  { id: "complete", title: "اكتمل الإعداد" },
];

// Main component
const OnboardingPage: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [websiteData, setWebsiteData] = useState({
    title: "",
    logo: null as string | null,
    favicon: null as string | null,
    category: "",
    colors: { ...COLOR_PALETTES[0] },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  // Handle file upload for logo
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          setWebsiteData({
            ...websiteData,
            logo: event.target.result as string,
          });
          toast({
            title: "تم رفع الشعار بنجاح",
            description: "يمكنك تغييره في أي وقت لاحقاً",
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // Handle file upload for favicon
  const handleFaviconUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = (event) => {
        if (event.target?.result) {
          setWebsiteData({
            ...websiteData,
            favicon: event.target.result as string,
          });
          toast({
            title: "تم رفع أيقونة الموقع بنجاح",
            description: "ستظهر في تبويب المتصفح",
          });
        }
      };

      reader.readAsDataURL(file);
    }
  };

  // Use logo as favicon
  const useLogoAsFavicon = () => {
    if (websiteData.logo) {
      setWebsiteData({
        ...websiteData,
        favicon: websiteData.logo,
      });
      toast({
        title: "تم استخدام الشعار كأيقونة للموقع",
        description: "يمكنك تغييرها في أي وقت لاحقاً",
      });
    } else {
      toast({
        title: "لم يتم رفع شعار بعد",
        description: "يرجى رفع شعار أولاً",
        variant: "destructive",
      });
    }
  };

  // Handle color palette selection
  const selectColorPalette = (palette: (typeof COLOR_PALETTES)[0]) => {
    setWebsiteData({
      ...websiteData,
      colors: { ...palette },
    });
  };

  // Navigate to next step
  const nextStep = () => {
    // Validate current step
    if (currentStep === 1 && !websiteData.title.trim()) {
      toast({
        title: "يرجى إدخال عنوان الموقع",
        description: "عنوان الموقع مطلوب للمتابعة",
        variant: "destructive",
      });
      return;
    }

    if (currentStep === 4 && !websiteData.category) {
      toast({
        title: "يرجى اختيار نوع الموقع",
        description: "اختيار نوع الموقع مطلوب للمتابعة",
        variant: "destructive",
      });
      return;
    }

    // If all validations pass, go to next step
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      // Complete onboarding
      completeOnboarding();
    }
  };

  // Navigate to previous step
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };

  // Complete the onboarding process
  const completeOnboarding = () => {
    // Here you would typically save the data to your backend
    console.log("Onboarding completed with data:", websiteData);

    // For now, we'll just show a success message and redirect
    toast({
      title: "تم إكمال إعداد موقعك بنجاح!",
      description: "سيتم توجيهك إلى لوحة التحكم",
    });

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  // Render the current step content
  const renderStepContent = () => {
    switch (STEPS[currentStep].id) {
      case "welcome":
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-64 h-64 relative mb-8">
              <Image
                src="/onboarding-welcome.svg"
                alt="مرحباً بك"
                fill
                className="object-contain"
              />
            </div>
            <CardTitle className="text-3xl">
              مرحباً بك في منشئ المواقع!
            </CardTitle>
            <CardDescription className="text-xl">
              سنساعدك على إعداد موقعك الجديد في خطوات بسيطة
            </CardDescription>
            <div className="bg-muted/50 p-4 rounded-lg text-right">
              <p className="text-lg font-medium mb-2">ماذا ستحتاج:</p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>عنوان لموقعك</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>شعار (اختياري)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>اختيار نوع الموقع</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-primary" />
                  <span>اختيار ألوان الموقع</span>
                </li>
              </ul>
            </div>
          </div>
        );

      case "title":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CardTitle className="text-2xl mb-2">
                ما هو عنوان موقعك؟
              </CardTitle>
              <CardDescription>
                هذا هو الاسم الذي سيظهر في أعلى موقعك وفي نتائج البحث
              </CardDescription>
            </div>

            <div className="space-y-4">
              <Label htmlFor="website-title">عنوان الموقع</Label>
              <Input
                id="website-title"
                placeholder="مثال: شركة الأفق للعقارات"
                value={websiteData.title}
                onChange={(e) =>
                  setWebsiteData({ ...websiteData, title: e.target.value })
                }
                className="text-lg h-12"
              />

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  نصائح لاختيار عنوان جيد:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                  <li>استخدم اسماً سهل التذكر ومرتبط بنشاطك</li>
                  <li>تجنب الأسماء الطويلة جداً</li>
                  <li>يمكن استخدام اسم شركتك أو اسمك الشخصي</li>
                </ul>
              </div>

              {websiteData.title && (
                <div className="mt-6 border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground mb-2">معاينة:</p>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div className="w-8 h-8 bg-primary/20 rounded-md"></div>
                    <p className="font-bold text-xl">{websiteData.title}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        );

      case "logo":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CardTitle className="text-2xl mb-2">شعار موقعك</CardTitle>
              <CardDescription>
                الشعار سيظهر في أعلى موقعك وفي الرسائل والمستندات
              </CardDescription>
            </div>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleLogoUpload}
              accept="image/*"
              className="hidden"
            />

            {!websiteData.logo ? (
              <div
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="font-medium mb-2">انقر لرفع شعار</p>
                <p className="text-sm text-muted-foreground">
                  أو اسحب الملف وأفلته هنا
                </p>
                <p className="text-xs text-muted-foreground mt-4">
                  يفضل صيغة PNG أو JPG بحجم 200×200 بكسل على الأقل
                </p>
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="relative w-48 h-48 mx-auto border rounded-lg overflow-hidden">
                  <Image
                    src={websiteData.logo || "/placeholder.svg"}
                    alt="شعار الموقع"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    تغيير الشعار
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() =>
                      setWebsiteData({ ...websiteData, logo: null })
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}

            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="font-medium mb-2 flex items-center gap-2">
                <Info className="h-4 w-4" />
                ملاحظات مهمة:
              </p>
              <ul className="space-y-1 text-sm text-muted-foreground list-disc list-inside">
                <li>يمكنك تخطي هذه الخطوة والعودة إليها لاحقاً</li>
                <li>استخدم شعاراً بخلفية شفافة للحصول على أفضل نتيجة</li>
                <li>يمكنك تعديل الشعار في أي وقت من إعدادات موقعك</li>
              </ul>
            </div>
          </div>
        );

      case "favicon":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CardTitle className="text-2xl mb-2">
                أيقونة الموقع (Favicon)
              </CardTitle>
              <CardDescription>
                هي الأيقونة الصغيرة التي تظهر في تبويب المتصفح وفي المفضلة
              </CardDescription>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg mb-6">
              <div className="flex items-start gap-3">
                <div className="mt-1">
                  <Info className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium mb-2">ما هي أيقونة الموقع؟</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    هي صورة صغيرة تظهر بجانب عنوان موقعك في تبويب المتصفح،
                    وتساعد المستخدمين على التعرف على موقعك بسهولة.
                  </p>
                  <div className="bg-background p-2 rounded border flex items-center gap-2 text-sm">
                    <div className="w-4 h-4 bg-primary rounded-sm"></div>
                    <span>موقعك | الصفحة الرئيسية</span>
                  </div>
                </div>
              </div>
            </div>

            <input
              type="file"
              ref={faviconInputRef}
              onChange={handleFaviconUpload}
              accept="image/*"
              className="hidden"
            />

            {!websiteData.favicon ? (
              <div className="space-y-4">
                <div
                  className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => faviconInputRef.current?.click()}
                >
                  <FileImage className="h-10 w-10 mx-auto mb-3 text-muted-foreground" />
                  <p className="font-medium mb-2">انقر لرفع أيقونة الموقع</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    يفضل صورة مربعة بصيغة PNG بحجم 32×32 بكسل
                  </p>
                </div>

                {websiteData.logo && (
                  <div className="text-center">
                    <p className="text-sm mb-2">أو</p>
                    <Button variant="outline" onClick={useLogoAsFavicon}>
                      استخدام الشعار كأيقونة
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center space-y-4">
                <div className="relative w-24 h-24 mx-auto border rounded-lg overflow-hidden bg-muted p-2">
                  <Image
                    src={websiteData.favicon || "/placeholder.svg"}
                    alt="أيقونة الموقع"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="flex justify-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => faviconInputRef.current?.click()}
                  >
                    تغيير الأيقونة
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() =>
                      setWebsiteData({ ...websiteData, favicon: null })
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        );

      case "category":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CardTitle className="text-2xl mb-2">اختر نوع موقعك</CardTitle>
              <CardDescription>
                سيساعدنا هذا في تقديم قوالب وميزات مناسبة لنشاطك
              </CardDescription>
            </div>

            <RadioGroup
              value={websiteData.category}
              onValueChange={(value) =>
                setWebsiteData({ ...websiteData, category: value })
              }
              className="grid gap-4"
            >
              {WEBSITE_CATEGORIES.map((category) => (
                <Label
                  key={category.id}
                  htmlFor={category.id}
                  className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all hover:border-primary ${
                    websiteData.category === category.id
                      ? "border-primary bg-primary/5"
                      : ""
                  }`}
                >
                  <RadioGroupItem
                    value={category.id}
                    id={category.id}
                    className="mt-1"
                  />
                  <div className="flex flex-1 items-start gap-4 mr-2">
                    <div className="relative w-16 h-16 shrink-0">
                      <Image
                        src={category.icon || "/placeholder.svg"}
                        alt={category.title}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div className="space-y-1">
                      <p className="font-medium text-lg">{category.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {category.description}
                      </p>
                    </div>
                  </div>
                </Label>
              ))}
            </RadioGroup>

            {websiteData.category && (
              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium mb-2 flex items-center gap-2">
                  <Info className="h-4 w-4" />
                  ميزات متاحة لهذا النوع:
                </p>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  {websiteData.category === "personal" && (
                    <>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>صفحة السيرة الذاتية</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>معرض الأعمال</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>نموذج التواصل</span>
                      </li>
                    </>
                  )}
                  {websiteData.category === "realestate" && (
                    <>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>عرض العقارات مع التصفية</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>خريطة تفاعلية للمواقع</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>نماذج حجز المعاينة</span>
                      </li>
                    </>
                  )}
                  {websiteData.category === "lawyer" && (
                    <>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>صفحات الخدمات القانونية</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>نماذج طلب الاستشارة</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-primary" />
                        <span>صفحة الأسئلة الشائعة</span>
                      </li>
                    </>
                  )}
                </ul>
              </div>
            )}
          </div>
        );

      case "colors":
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <CardTitle className="text-2xl mb-2">اختر ألوان موقعك</CardTitle>
              <CardDescription>
                الألوان تعكس هوية موقعك وتؤثر على انطباع الزوار
              </CardDescription>
            </div>

            <div className="space-y-6">
              <div className="space-y-4">
                <p className="font-medium">اختر من المجموعات الجاهزة:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {COLOR_PALETTES.map((palette, index) => (
                    <div
                      key={index}
                      className={`border rounded-lg p-3 cursor-pointer transition-all hover:border-primary ${
                        websiteData.colors.primary === palette.primary
                          ? "border-primary bg-primary/5"
                          : ""
                      }`}
                      onClick={() => selectColorPalette(palette)}
                    >
                      <div className="flex gap-2 mb-3">
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: palette.primary }}
                        ></div>
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: palette.secondary }}
                        ></div>
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: palette.accent }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">مجموعة {index + 1}</span>
                        {websiteData.colors.primary === palette.primary && (
                          <CheckCircle className="h-5 w-5 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <p className="font-medium mb-3 flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  معاينة الألوان المختارة:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-md"
                      style={{ backgroundColor: websiteData.colors.primary }}
                    ></div>
                    <div>
                      <p className="font-medium">اللون الرئيسي</p>
                      <p className="text-xs text-muted-foreground">
                        {websiteData.colors.primary}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-md"
                      style={{ backgroundColor: websiteData.colors.secondary }}
                    ></div>
                    <div>
                      <p className="font-medium">اللون الثانوي</p>
                      <p className="text-xs text-muted-foreground">
                        {websiteData.colors.secondary}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-md"
                      style={{ backgroundColor: websiteData.colors.accent }}
                    ></div>
                    <div>
                      <p className="font-medium">لون التأكيد</p>
                      <p className="text-xs text-muted-foreground">
                        {websiteData.colors.accent}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <p className="font-medium mb-3 flex items-center gap-2">
                  <Layout className="h-4 w-4" />
                  كيف ستظهر الألوان في موقعك:
                </p>
                <div className="border rounded-md overflow-hidden">
                  <div
                    className="h-10 flex items-center px-4 justify-between"
                    style={{
                      backgroundColor: websiteData.colors.primary,
                      color: "white",
                    }}
                  >
                    <span className="text-sm font-medium">اسم الموقع</span>
                    <div className="flex gap-2">
                      <div className="w-4 h-4 rounded-full bg-white/20"></div>
                      <div className="w-4 h-4 rounded-full bg-white/20"></div>
                      <div className="w-4 h-4 rounded-full bg-white/20"></div>
                    </div>
                  </div>
                  <div className="p-4 bg-white dark:bg-background">
                    <div
                      className="h-8 w-24 rounded-md flex items-center justify-center text-sm font-medium mb-3"
                      style={{
                        backgroundColor: websiteData.colors.secondary,
                        color: "white",
                      }}
                    >
                      زر التواصل
                    </div>
                    <div className="flex gap-2 mb-3">
                      <div className="h-3 w-20 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                      <div className="h-3 w-16 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                    </div>
                    <div className="h-3 w-full rounded-full bg-gray-200 dark:bg-gray-700 mb-2"></div>
                    <div className="h-3 w-3/4 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "complete":
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-64 h-64 relative mb-8">
              <Image
                src="/onboarding-complete.svg"
                alt="اكتمل الإعداد"
                fill
                className="object-contain"
              />
            </div>
            <CardTitle className="text-3xl">
              تهانينا! تم إعداد موقعك بنجاح
            </CardTitle>
            <CardDescription className="text-xl">
              يمكنك الآن البدء في بناء موقعك وتخصيصه
            </CardDescription>

            <div className="bg-muted/50 p-4 rounded-lg text-right">
              <p className="text-lg font-medium mb-2">ملخص الإعدادات:</p>
              <ul className="space-y-3 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Home className="h-5 w-5 text-primary" />
                  <span>
                    اسم الموقع:{" "}
                    <span className="font-medium text-foreground">
                      {websiteData.title}
                    </span>
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Layout className="h-5 w-5 text-primary" />
                  <span>
                    نوع الموقع:{" "}
                    <span className="font-medium text-foreground">
                      {WEBSITE_CATEGORIES.find(
                        (c) => c.id === websiteData.category,
                      )?.title || "غير محدد"}
                    </span>
                  </span>
                </li>
                <li className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  <span>
                    الألوان:
                    <span className="inline-flex items-center gap-1 mr-2">
                      <span
                        className="w-4 h-4 rounded-full inline-block"
                        style={{ backgroundColor: websiteData.colors.primary }}
                      ></span>
                      <span
                        className="w-4 h-4 rounded-full inline-block"
                        style={{
                          backgroundColor: websiteData.colors.secondary,
                        }}
                      ></span>
                      <span
                        className="w-4 h-4 rounded-full inline-block"
                        style={{ backgroundColor: websiteData.colors.accent }}
                      ></span>
                    </span>
                  </span>
                </li>
              </ul>
            </div>

            <p className="text-muted-foreground">
              سيتم توجيهك إلى لوحة التحكم للبدء في بناء موقعك
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  // Render progress steps
  const renderProgressSteps = () => {
    return (
      <div className="flex justify-between items-center mb-8 px-2">
        {STEPS.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  index < currentStep
                    ? "bg-primary text-white"
                    : index === currentStep
                      ? "bg-primary/20 text-primary border-2 border-primary"
                      : "bg-muted text-muted-foreground"
                }`}
              >
                {index < currentStep ? (
                  <Check className="h-4 w-4" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-xs mt-1 hidden sm:block">{step.title}</span>
            </div>

            {/* Connector line */}
            {index < STEPS.length - 1 && (
              <div
                className={`h-0.5 flex-1 mx-1 ${index < currentStep ? "bg-primary" : "bg-muted"}`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <div className="container max-w-4xl py-8">
      <Card className="border-none shadow-lg">
        <CardHeader className="pb-0">
          {currentStep > 0 &&
            currentStep < STEPS.length - 1 &&
            renderProgressSteps()}
        </CardHeader>

        <CardContent className="pt-6 pb-4">{renderStepContent()}</CardContent>

        <CardFooter className="flex justify-between border-t pt-6">
          {currentStep > 0 ? (
            <Button
              variant="outline"
              onClick={prevStep}
              className="flex items-center gap-1"
            >
              <ChevronRight className="h-4 w-4" />
              السابق
            </Button>
          ) : (
            <div></div> // Empty div to maintain layout
          )}

          <Button onClick={nextStep} className="flex items-center gap-1">
            {currentStep < STEPS.length - 1 ? (
              <>
                التالي
                <ChevronLeft className="h-4 w-4" />
              </>
            ) : (
              "الانتقال إلى لوحة التحكم"
            )}
          </Button>
        </CardFooter>
      </Card>

      <TooltipProvider>
        <div className="mt-6 text-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="link" className="text-muted-foreground">
                تخطي الإعداد
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>يمكنك إكمال الإعداد لاحقاً من صفحة الإعدادات</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </div>
  );
};

export default OnboardingPage;
