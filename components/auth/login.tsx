"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { Eye, EyeOff, LogIn, Mail, Lock } from "lucide-react";
import { useAuthStore } from "@/lib/store/authStore";

const Login = () => {
  const { login } = useAuthStore();
  const [formData, setFormData] = useState({
    mainId: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.mainId) {
      newErrors.mainId = "ID is required";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsLoading(true);
    try {
      await login(formData.mainId, formData.password);
      toast("Login Successful", { description: "Welcome back!" });

      // Role-based redirects using store state and localStorage
      const { user } = useAuthStore.getState();
      const userType = user?.userType;

      if (userType === "Parent") {
        const parentId = localStorage.getItem("parentId") || "101";
        router.push(`/parent?parentId=${parentId}`);
      } else if (userType === "Student") {
        router.push("/student/dashboard");
      } else if (userType === "Registrar") {
        router.push("/registrar");
      } else if (userType === "Teacher") {
        router.push("/teacher");
      } else if (userType === "Department") {
        router.push("/department");
      } else {
        router.push("/");
      }
    } catch (error) {
      toast("Login Failed", {
        description: "Invalid ID or Password. Please try again.",
        style: {
          backgroundColor: "#e2f8d7",
          color: "#62721c",
          borderColor: "#f5c6cb",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <LogIn className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>Sign in to your portal account</CardDescription>
        </CardHeader>

        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="ugr" className="text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4" />
                ID<span className="text-red-500">*</span>
              </Label>
              <Input
                id="mainId"
                name="mainId"
                type="text"
                placeholder="e.g. student01, registrar01, parent01"
                value={formData.mainId}
                onChange={handleChange}
                className={errors.mainId ? "border-red-500" : ""}
              />
              {errors.mainId && (
                <p className="text-red-500 text-sm">{errors.mainId}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password <span className="text-red-500">*</span>
              </Label>
              <div className="relative space-y-6">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="password123"
                  value={formData.password}
                  onChange={handleChange}
                  className={errors.password ? "border-red-500" : ""}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm">{errors.password}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>

            <div className="text-xs text-gray-600 text-center">
              Demo accounts: student01, registrar01, teacher01, department01, parent01 / password123
            </div>

            <div className="text-center">
              <Link href="/auth/forgot-password" className="text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline">
                Forgot your password?
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;
