"use client"
import { DashboardContent } from "@/components/feature/dashboard/dashboard-content";
import { supabase } from "@/lib/supabase-client";
import { useEffect } from "react";


export default function Dashboard() {
  useEffect(() => {
    const checkUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      console.log('User session check:', { data, error })
    }
    checkUser()
  }, [])
  return <DashboardContent />;
}