import axios from "axios";
import useAuthStore from "@/context/AuthContext";

// إنشاء instance مع تعيين عنوان القاعدة (baseURL) إن وُجد
const axiosInstance = axios.create({
  baseURL: "https://taearif.com/api",
});

// استخدام interceptor لإضافة Authorization header قبل كل طلب
axiosInstance.interceptors.request.use(
  (config) => {
    // الحصول على التوكن من Zustand
    const token = useAuthStore.getState().userData?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
