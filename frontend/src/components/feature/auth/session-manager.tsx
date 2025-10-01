"use client";

import { useEffect } from "react";

export default function SessionManager() {
  useEffect(() => {
    // Kiểm tra Remember me preference khi app load
    const checkRememberMePreference = () => {
      const rememberMe = localStorage.getItem('rememberMe') === 'true';
      const isTemporarySession = sessionStorage.getItem('supabase-temporary-session') === 'true';
      
      // OAuth login mặc định có Remember me
      if (rememberMe) {
        console.log('Remember me enabled - session will persist');
      }
      
      // Nếu không có remember me và có temporary session flag
      if (!rememberMe && isTemporarySession) {
        // Đánh dấu rằng đây là session tạm thời
        // Session sẽ được clear khi đóng browser (sessionStorage tự động clear)
        console.log('Temporary session detected - will be cleared on browser close');
      }
    };

    checkRememberMePreference();
  }, []);

  return null; // Component không render gì
}
