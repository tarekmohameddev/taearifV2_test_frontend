"use client";

import { useEffect } from "react";
import useStore from "@/context/Store";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";

export function SetupProgressCard() {
  const {
    homepage: {
      setupProgressData,
      isSetupProgressDataUpdated,
      fetchSetupProgressData,
    },
    loading,
  } = useStore();

  useEffect(() => {
    if (!isSetupProgressDataUpdated) {
      fetchSetupProgressData();
    }
  }, [isSetupProgressDataUpdated, fetchSetupProgressData]);

  // عرض Skeleton أثناء التحميل
  if (!isSetupProgressDataUpdated) {
    return (
      <Card className="col-span-3">
        <CardHeader>
          <Skeleton className="h-6 w-24 mb-2" />
          <Skeleton className="h-4 w-40" />
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-2 w-full" />
          </div>
          <div className="space-y-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-6 w-6 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
          <Skeleton className="h-8 w-full" />
        </CardContent>
      </Card>
    );
  }

  // 1) نحسب النسبة المئوية (لو كانت الـ API تُرجع 0–1)
  //    أو نستخدمها مباشرةً إذا كانت 0–100
  const progressPercent = 
    setupProgressData.progress <= 1
      ? Math.round(setupProgressData.progress * 100)
      : setupProgressData.progress;

  // 2) نحول الـ steps من object إلى array
  const completedSteps = Object.entries(setupProgressData.steps).map(
    ([id, completed]) => ({
      id,
      name: id
        .split("_")
        .map((w) => w[0].toUpperCase() + w.slice(1))
        .join(" "),
      completed,
    })
  );

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>تقدم الإعداد</CardTitle>
        <CardDescription>
          أكمل إعداد موقعك للحصول على أفضل النتائج
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 gap-5">
        {/* شريط التقدم */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">اكتمال الإعداد</span>
            <span className="text-sm font-medium">{progressPercent}%</span>
          </div>
          <Progress value={progressPercent} />
        </div>

        {/* قائمة الخطوات */}
        <div className="space-y-2">
          {completedSteps.map((step) => (
            <div key={step.id} className="flex items-center gap-2">
              <div
                className={`flex h-6 w-6 items-center justify-center ${
                  step.completed
                    ? "rounded-full bg-primary/10 text-primary"
                    : "rounded-full border border-dashed"
                }`}
              >
                {step.completed ? (
                  <Check className="h-3.5 w-3.5" />
                ) : (
                  <span className="text-xs">?</span>
                )}
              </div>
              <span className="text-sm">{step.name}</span>
            </div>
          ))}
        </div>

        {/* زر المتابعة إلى المسار القادم من API */}
        <Button size="sm" className="w-full gap-1" asChild>
          <Link href={setupProgressData.continue_path}>
            <span>متابعة الإعداد</span>
            <ArrowRight className="h-3.5 w-3.5 mr-0 ml-1" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default SetupProgressCard;
