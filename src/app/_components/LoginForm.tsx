// filepath: c:\Users\Vivang Mishra\my-next-app\src\app\_components\LoginForm.tsx
"use client";
import { FormEvent, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { loginAction } from "@/app/actions/login";

function LoginButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Signing in..." : "Login"}
    </button>
  );
}

const LoginForm = () => {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "invalid-credentials") {
      toast.error("Invalid email or password.");
    } else if (error === "missing-fields") {
      toast.error("Please fill in all fields.");
    }
  }, [searchParams]);

  const validate = () => {
    const nextErrors: { email?: string; password?: string } = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    if (!validate()) {
      event.preventDefault();
    }
  };

  return (
    <form action={loginAction} className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter Your Email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
            errors.email ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
          }`}
        />
        {errors.email ? <p className="mt-1 text-sm text-red-600">{errors.email}</p> : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter Your Password"
          required
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
            errors.password ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
          }`}
        />
        {errors.password ? <p className="mt-1 text-sm text-red-600">{errors.password}</p> : null}
      </div>

      <LoginButton />
    </form>
  );
};

export default LoginForm;