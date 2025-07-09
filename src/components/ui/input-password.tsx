'use client';
import { Eye, EyeOff } from 'lucide-react';
import { type ComponentProps, useState } from 'react';
import { twMerge } from 'tailwind-merge';
import { Input } from './input';

export function InputPassword({
  className,
  ...props
}: ComponentProps<'input'>) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="relative">
      <Input
        className={twMerge('pr-10', className)}
        placeholder="Digite sua senha"
        type={showPassword ? 'text' : 'password'}
        {...props}
      />
      <button
        className='absolute top-0 right-0 h-full cursor-pointer px-3 py-2'
        onClick={togglePasswordVisibility}
        type="button"
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
