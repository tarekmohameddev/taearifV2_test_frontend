"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import LoadingComp from "@/components/LoadingComp";

export function RecentActivity() {
  const [RecentActivityData, setRecentActivityData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // دالة جلب البيانات من API
  const fetchRecentActivity = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("https://taearif.com/api/dashboard/recent-activity");
      console.log("response.data",response.data)
      setRecentActivityData(response.data);
    } catch (err) {
      console.error("Error fetching setup-progress pages:", err);
      setError(err.message || "حدث خطأ أثناء جلب البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecentActivity();
  }, []);

  if (loading) return <LoadingComp />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <Card>
    <CardHeader>
      <CardTitle>النشاط الأخير</CardTitle>
      <CardDescription>
        آخر الإجراءات التي تمت على موقعك
      </CardDescription>
    </CardHeader>
    <CardContent className="space-y-4">
      {RecentActivityData.activities?.map((item, index) => (
        <div
          key={index}
          className="flex items-center gap-4 rounded-lg border p-3"
        >
          <div className="rounded-full bg-primary/10 p-2">
            <item.icon className="h-4 w-4 text-primary" />
          </div>
          <div className="flex-1">
            <p className="font-medium">{item.action}</p>
            <p className="text-sm text-muted-foreground">
              {item.section} • {item.time}
            </p>
          </div>
        </div>
      ))}
    </CardContent>
  </Card>
  );
}

export default RecentActivity;
