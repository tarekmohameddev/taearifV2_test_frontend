import { serialize } from "cookie";

export default function handler(req, res) {
  if (req.method === "POST") {
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

    // حذف الكوكيز عن طريق تعيينها بتاريخ منتهي الصلاحية
    res.setHeader("Set-Cookie", cookies);
    res.setHeader("Cache-Control", "no-store, max-age=0");
    // إرجاع استجابة بنجاح العملية
    res.status(200).json({ message: "تم تسجيل الخروج بنجاح" });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`الطريقة ${req.method} غير مسموحة`);
  }
}
