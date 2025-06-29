"use client";

import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LoginFormData = {
  email: string;
  password: string;
};

type errorType = {
  isError: boolean;
  message: string;
};

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const router = useRouter();
  const [error, setIsError] = useState<errorType>({
    isError: false,
    message: "",
  });

  const onSubmit = async (data: { email: string; password: string }) => {
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (res?.error) {
      setIsError({
        isError: !res.ok,
        message: res.error,
      });
    } else {
      router.push("/admin");
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-[100dvh]">
      <div className="flex flex-col items-center justify-center min-w-[350px]">
        {error.isError && (
          <div className="border-2 border-red-500 p-2 w-full rounded-lg mb-8">
            <p className="text-red-500">{error.message}</p>
          </div>
        )}
        <h1 className="text-5xl font-semibold mb-8">Login</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-6 w-full p-4">
          <div className="flex flex-col gap-2 w-full">
            <label>Email</label>
            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              className="border-2 border-neutral-600 rounded-lg p-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label>Password</label>
            <input
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters",
                },
              })}
              type="password"
              className="border-2 border-neutral-600 rounded-lg p-2"
            />
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
          </div>
          <button
            type="submit"
            className="bg-yellow-200 hover:bg-yellow-300 font-semibold cursor-pointer w-full p-3 rounded-lg mt-12"
          >
            Login
          </button>
        </form>
      </div>
    </main>
  );
}
