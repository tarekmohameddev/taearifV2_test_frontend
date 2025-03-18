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

export function MostVisitedPagesTable() {
  const [pagesData, setPagesData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // دالة جلب البيانات من API
  const fetchMostVisitedPages = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get("https://taearif.com/api/dashboard/most-visited-pages");
      setPagesData(response.data.pages);
    } catch (err) {
      console.error("Error fetching most visited pages:", err);
      setError(err.message || "حدث خطأ أثناء جلب البيانات");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMostVisitedPages();
  }, []);

  if (loading) return <LoadingComp />;
  if (error) return <div className="text-red-500 text-center">{error}</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>أكثر الصفحات زيارة</CardTitle>
        <CardDescription>تحليل أداء صفحات الموقع</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>الصفحة</TableHead>
                <TableHead>المشاهدات</TableHead>
                <TableHead>الزوار الفريدون</TableHead>
                <TableHead>معدل الارتداد</TableHead>
                <TableHead>متوسط وقت التصفح</TableHead>
                <TableHead>نسبة المشاهدات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pagesData?.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{row.path}</TableCell>
                  <TableCell>{row.views}</TableCell>
                  <TableCell>{row.unique_visitors}</TableCell>
                  <TableCell>{row.bounce_rate}</TableCell>
                  <TableCell>{row.avg_time}</TableCell>
                  <TableCell>{row.percentage}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}

export default MostVisitedPagesTable;
