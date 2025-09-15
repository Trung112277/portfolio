"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/feature/form/auth/login-form";
import RegisterForm from "@/components/feature/form/auth/resgiter-form";
import AuthTitle from "@/components/heading/auth-title";
import GithubLoginButton from "../form/auth/github-login-button";
import GoogleLoginButton from "../form/auth/google-login-button";

export default function Auth() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="flex flex-col items-center justify-center gap-4  max-w-[500px] w-full">
      <AuthTitle />
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        <TabsContent value="login" className="p-4 flex flex-col gap-4">
          <LoginForm />
          <div className="flex flex-row items-center justify-center gap-2">
            <div className="w-full h-[1px] bg-gray-300" />
            <span>Or</span>
            <div className="w-full h-[1px] bg-gray-300" />
          </div>
          <GoogleLoginButton />
          <GithubLoginButton />
        </TabsContent>
        <TabsContent value="register" className="p-4">
          <RegisterForm onSuccess={() => setActiveTab("login")} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
