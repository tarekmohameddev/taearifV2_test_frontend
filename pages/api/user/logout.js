import https from "https";
import axios from "axios";
import { serialize } from "cookie";
import axiosInstance from "@/lib/axiosInstance";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await axiosInstance.post("https://taearif.com/api/logout");
    } catch (error) {
      console.error("حدث خطأ أثناء إرسال طلب تسجيل الخروج إلى API الخارجي:", error);
    }

    const cookies = [
      serialize("authToken", "", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        expires: new Date(0),
        sameSite: "strict",
        path: "/",
      }),
      serialize("next-auth.session-token", "", {
        path: "/",
        expires: new Date(0),
        secure: process.env.NODE_ENV !== "development",
        sameSite: "lax",
      }),
      serialize("csrf-token", "", {
        path: "/",
        expires: new Date(0),
      }),
    ];

    res.setHeader("Set-Cookie", cookies);
    res.setHeader("Cache-Control", "no-store, max-age=0");
    res.status(200).json({ message: "تم تسجيل الخروج بنجاح" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`الطريقة ${req.method} غير مسموحة`);
  }
}
