import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/feature/form/auth/login-form";
import RegisterForm from "@/components/feature/form/auth/resgiter-form";

export default function Auth() {
  return (
    <Tabs
      defaultValue="login"
      className="max-w-[500px] w-full"
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>
      <TabsContent value="login" className="p-4">
        <LoginForm />
      </TabsContent>
      <TabsContent value="register" className="p-4">
        <RegisterForm />
      </TabsContent>
    </Tabs>
  );
}
