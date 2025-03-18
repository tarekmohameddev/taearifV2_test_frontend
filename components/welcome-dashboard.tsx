"use client";

import { useState, useEffect } from "react";
import type React from "react";
import axiosInstance from "@/lib/axiosInstance";
import {
  ArrowRight,
  FileText,
  Globe,
  LayoutGrid,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LoadingComp from "@/components/LoadingComp";
import VisitorChart from "@/components/VisitorChart";
import MostVisitedPagesTable from "@/components/MostVisitedPagesTable";
import RecentActivity from "@/components/recent-activity";
import SetupProgressCard from "@/components/SetupProgressCard";


export function WelcomeDashboard() {
  const [setupProgress, setSetupProgress] = useState(60);
  const [dashboardSummary, setDashboardSummary] = useState(null);
  const [dashboardDevice, setDashboardDevice] = useState([
    {
       "color" : "#4285F4",
       "name" : "جاري التحميل",
       "value" : 35
    },
    {
       "color" : "#34A853",
       "name" : "جاري التحميل",
       "value" : 25
    },
    {
       "color" : "#A142F4",
       "name" : "جاري التحميل",
       "value" : 20
    },
    {
       "color" : "#F4B400",
       "name" : "جاري التحميل",
       "value" : 15
    },
    {
       "color" : "#6B7280",
       "name" : "جاري التحميل",
       "value" : 5
    }
 ]);
  const [trafficSources, setTrafficSources] = useState([
    {
       "color" : "#4285F4",
       "name" : "جاري التحميل",
       "value" : 35
    },
    {
       "color" : "#34A853",
       "name" : "جاري التحميل",
       "value" : 25
    },
    {
       "color" : "#A142F4",
       "name" : "جاري التحميل",
       "value" : 20
    },
    {
       "color" : "#F4B400",
       "name" : "جاري التحميل",
       "value" : 15
    },
    {
       "color" : "#6B7280",
       "name" : "جاري التحميل",
       "value" : 5
    }
 ]);
  const [error, setError] = useState(null);
  const [selectedTimeRange, setSelectedTimeRange] = useState("30");

  const fetchDashboardSummary = async () => {
    try {
      const response = await axiosInstance.get(
        "https://taearif.com/api/dashboard/summary",
      );
      console.log("Dashboard summary:", response.data);
      setDashboardSummary(response.data); // تحديث الحالة بالبيانات المسترجعة
    } catch (error) {
      console.error("Error fetching dashboard summary:", error);
      setError(error.message || "حدث خطأ أثناء جلب ملخص اللوحة");
    }
  };


  const fetchDashboardDevices = async () => {
    try {
      const response = await axiosInstance.get(
        "https://taearif.com/api/dashboard/devices",
      );
      console.log("Dashboard devices:", response.data);
      setDashboardDevice(response.data.devices); // تحديث الحالة بالبيانات المسترجعة
    } catch (error) {
      console.error("Error fetching dashboard devices:", error);
      setError(error.message || "حدث خطأ أثناء جلب اجهزة اللوحة");
    }
  };

  const fetchTrafficsources= async () => {
    try {
      const response = await axiosInstance.get(
        "https://taearif.com/api/dashboard/traffic-sources",
      );
      console.log("Dashboard traffic-sources:", response.data);
      setTrafficSources(response.data.sources); // تحديث الحالة بالبيانات المسترجعة
    } catch (error) {
      console.error("Error fetching dashboard traffic-sources:", error);
      setError(error.message || "حدث خطأ أثناء جلب اجهزة اللوحة");
    }
  };
  
  
  
  useEffect(() => {
    fetchDashboardSummary();
    fetchDashboardDevices();
    fetchTrafficsources();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          مرحباً بك في موقعي الشخصي!
        </h1>
        <p className="text-muted-foreground">هذه نظرة عامة على موقعك وأدائه.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">الزيارات</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold">
                {dashboardSummary?.visits.toLocaleString() || 0}
              </div>

              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    dashboardSummary?.visits_change > 0
                      ? "text-green-500"
                      : "text-red-500"
                  }
                >
                  {dashboardSummary?.visits_change > 0 ? "↑" : "↓"}{" "}
                  {Math.abs(dashboardSummary?.visits_change)  || 0}%
                </span>{" "}
                من الشهر الماضي
              </p>
            </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              مشاهدات الصفحات
            </CardTitle>
          </CardHeader>
          <CardContent>
          <div className="text-2xl font-bold">
                  {dashboardSummary?.page_views.toLocaleString()  || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      dashboardSummary?.page_views_change > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {dashboardSummary?.page_views_change > 0 ? "↑" : "↓"}{" "}
                    {Math.abs(dashboardSummary?.page_views_change)  || 0}%
                  </span>{" "}
                  من الشهر الماضي
                </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">متوسط الوقت</CardTitle>
          </CardHeader>
          <CardContent>
                <div className="text-2xl font-bold">
                  {dashboardSummary?.average_time  || 0}
                </div>
                <p className="text-xs text-muted-foreground">
                  <span
                    className={
                      dashboardSummary?.average_time_change > 0
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {dashboardSummary?.average_time_change > 0 ? "↑" : "↓"}{" "}
                    {Math.abs(dashboardSummary?.average_time_change)  || 0}%
                  </span>{" "}
                  من الشهر الماضي
                </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">معدل الارتداد</CardTitle>
          </CardHeader>
          <CardContent>
              <div className="text-2xl font-bold">
                {dashboardSummary?.bounce_rate.toFixed(2)  || 0} %
              </div>
              <p className="text-xs text-muted-foreground">
                <span
                  className={
                    dashboardSummary?.bounce_rate_change > 0
                      ? "text-red-500"
                      : "text-green-500"
                  }
                >
                  {dashboardSummary?.bounce_rate_change > 0 ? "↑" : "↓"}{" "}
                  {Math.abs(dashboardSummary?.bounce_rate_change)  || 0}%
                </span>{" "}
                من الشهر الماضي
              </p>
            </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* نظرة عامة على الزيارات */}
        <Card className="col-span-4">
  <CardHeader>
    <CardTitle>نظرة عامة على الزيارات</CardTitle>
  </CardHeader>
  <CardContent>
    <VisitorChart 
    />
  </CardContent>
</Card>

        {/* تقدم الإعداد */}
      <SetupProgressCard/>
      </div>

      <Tabs defaultValue="content" className="website-content">
        <TabsList>
          <TabsTrigger value="content">المحتوى</TabsTrigger>
          <TabsTrigger value="activity">النشاط الأخير</TabsTrigger>
        </TabsList>
        <TabsContent value="content" className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Devices Chart */}
            <Card>
              <CardHeader>
                <CardTitle>الأجهزة</CardTitle>
                <CardDescription>توزيع الزيارات حسب نوع الجهاز</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={dashboardDevice}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {[
                          {
                            name: "الهاتف المحمول",
                            value: 55,
                            color: "#4285F4",
                          },
                          { name: "الحاسوب", value: 25, color: "#34A853" },
                          {
                            name: "الجهاز اللوحي",
                            value: 15,
                            color: "#A142F4",
                          },
                          { name: "أخرى", value: 5, color: "#6B7280" },
                        ].map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke="transparent"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        iconType="circle"
                        iconSize={10}
                        formatter={(value, entry, index) => (
                          <span className="text-sm font-medium">{value}</span>
                        )}
                        wrapperStyle={{ paddingRight: 20 }}
                      />
                      <Tooltip
                        formatter={(value, name) => [`${value}%`, name]}
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          padding: "8px 12px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Traffic Sources Chart */}
            <Card>
              <CardHeader>
                <CardTitle>مصادر الزيارات</CardTitle>
                <CardDescription>توزيع مصادر حركة المرور</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={trafficSources}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={3}
                        dataKey="value"
                        labelLine={false}
                        label={({ name, percent }) =>
                          `${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {[
                          { name: "البحث العضوي", value: 45, color: "#4285F4" },
                          {
                            name: "الروابط المباشرة",
                            value: 25,
                            color: "#34A853",
                          },
                          {
                            name: "وسائل التواصل",
                            value: 15,
                            color: "#A142F4",
                          },
                          { name: "الإعلانات", value: 10, color: "#F4B400" },
                          { name: "أخرى", value: 5, color: "#6B7280" },
                        ].map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={entry.color}
                            stroke="transparent"
                            strokeWidth={2}
                          />
                        ))}
                      </Pie>
                      <Legend
                        layout="vertical"
                        verticalAlign="middle"
                        align="right"
                        iconType="circle"
                        iconSize={10}
                        formatter={(value, entry, index) => (
                          <span className="text-sm font-medium">{value}</span>
                        )}
                        wrapperStyle={{ paddingRight: 20 }}
                      />
                      <Tooltip
                        formatter={(value, name) => [`${value}%`, name]}
                        contentStyle={{
                          backgroundColor: "white",
                          borderRadius: "8px",
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          padding: "8px 12px",
                          border: "1px solid #e2e8f0",
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Most Visited Pages Table */}
          <MostVisitedPagesTable/>
        </TabsContent>
        <TabsContent value="activity">
<RecentActivity/>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Check(props: React.SVGProps<SVGSVGElement>) {
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}
