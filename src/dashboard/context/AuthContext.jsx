/** @format */

import { createContext, useCallback, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export { AuthContext };

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const storedUser = localStorage.getItem("adminUser");
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      setTimeout(() => setIsAuthenticated(true), 0);
      // setIsAuthenticated(true);
      if (storedUser && storedUser !== "undefined" && storedUser !== "null") {
        try {
          const parsedUser = JSON.parse(storedUser);
          console.log("Parsed user data:", parsedUser); // 🔍 تحقق من البيانات بعد التحليل
          setTimeout(() => setUser(parsedUser), 0);
          console.log("Stored user data:", storedUser); // 🔍 تحقق من البيانات المخزنة
        } catch (error) {
          console.error("Failed to parse stored user data:", error);
          localStorage.removeItem("adminUser");
          setTimeout(() => setUser(null), 0);
        }
      } else {
        setTimeout(() => setUser(null), 0);
      }
    } else {
      setTimeout(() => setUser(null), 0);
      setTimeout(() => setIsAuthenticated(false), 0);
    }
    setTimeout(() => setLoading(false), 0);
  }, [token, storedUser]);

  const login = useCallback(async (email, password) => {
    try {
      const response = await axios.post(
        "/api/Auth/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;
      console.log("Login response data:", data); // 🔍 تحقق من البيانات المستلمة
      // 👇 حسب شكل API تبعك
      setUser(data.user);
      setIsAuthenticated(true);

      localStorage.setItem("token", data.token);
      console.log("Token stored in localStorage:", data.token); // 🔍 تحقق من تخزين التوكن
      localStorage.setItem("adminUser", JSON.stringify(data.firstName)); // 👈 تأكد من تخزين الاسم فقط أو الكائن كامل حسب حاجتك
      console.log(
        "User stored in localStorage:",
        JSON.stringify(data.firstName)
      ); // 🔍 تحقق من تخزين المستخدم
      return data.user;
    } catch (error) {
      console.error("Login error:", error);

      // 🔥 معالجة الأخطاء بشكل صحيح
      if (error.response) {
        // السيرفر رجع response بس فيه error (401, 500...)
        throw new Error(error.response.data?.message || "Login failed");
      } else if (error.request) {
        // الطلب وصل لكن ما في رد (CORS / server down)
        throw new Error("Cannot connect to server");
      } else {
        // خطأ عام
        throw new Error(error.message || "Something went wrong");
      }
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem("adminUser");
    localStorage.removeItem("token");
  }, []);

  const value = {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
