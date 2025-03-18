"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check } from "lucide-react";
import LoadingComp from "@/components/LoadingComp";

export function SetupProgressCard() {
  const [setupProgressData, setSetupProgressData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // دالة جلب البيانات من API
  const fetchSetupProgress = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("https://taearif.com/api/dashboard/setup-progress");
      setSetupProgressData(response.data);
    } catch (err) {
      console.error("Error fetching setup-progress data:", err);
      setError(err.message || "حدث خطأ أثناء جلب البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSetupProgress();
  }, []);

  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>تقدم الإعداد</CardTitle>
        <CardDescription>
          أكمل إعداد موقعك للحصول على أفضل النتائج
        </CardDescription>
      </CardHeader>
      <CardContent className={`${loading? "min-h-[150px] flex justify-center items-center":"space-y-5"}`}>
{loading? <LoadingComp/>: (
    <>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">اكتمال الإعداد</span>
            <span className="text-sm font-medium">{setupProgressData.progress_percentage}%</span>
          </div>
          <Progress value={setupProgressData.progress_percentage} />
        </div>
        <div className="space-y-2">
          {setupProgressData.completed_steps.map((step) => (
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
                  <span className="text-xs">{step.id}</span>
                )}
              </div>
              <span className="text-sm">{step.name}</span>
            </div>
          ))}
        </div>
        <Button size="sm" className="w-full gap-1">
          <span>متابعة الإعداد</span>
          <ArrowRight className="h-3.5 w-3.5 mr-0 ml-1" />
        </Button>
        </>
      )}
      </CardContent>
    </Card>
  );
}

export default SetupProgressCard;
