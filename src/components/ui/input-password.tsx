"use client";
import { ComponentProps, useState } from "react";
import { Input } from "./input";
import { twMerge } from "tailwind-merge";
import { Eye, EyeOff } from "lucide-react";

export function InputPassword({ className, ...props }: ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Digite sua senha"
        className={twMerge("pr-10", className)}
        {...props}
      />
      <button
        type="button"
        className="absolute right-0 top-0 h-full px-3 py-2 cursor-pointer"
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <EyeOff className="h-4 w-4" />
        ) : (
          <Eye className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}