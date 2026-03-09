"use client";

import { FormEvent, useState, useEffect } from "react";
import { useFormStatus } from "react-dom";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { registerAction } from "@/app/actions/auth";

function RegisterButton() {
  const { pending } = useFormStatus();
  
  return (
    <button
      type="submit"
      disabled={pending}
      className="mt-3 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {pending ? "Creating account..." : "Register"}
    </button>
  );
}

const RegisterForm = () => {
  const searchParams = useSearchParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});

  useEffect(() => {
    const error = searchParams.get("error");
    if (error === "missing-fields") {
      toast.error("Please fill in all required fields.");
    } else if (error === "email-already-exists") {
      toast.error("This email is already registered.");
    }
  }, [searchParams]);

  const validate = () => {
    const nextErrors: { name?: string; email?: string; password?: string } = {};

    if (!name.trim()) {
      nextErrors.name = "Name is required.";
    }

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
    <form action={registerAction} className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700">Name</label>
        <input
          type="text"
          name="name"
          required
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
            errors.name ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
          }`}
        />
        {errors.name ? <p className="mt-1 text-sm text-red-600">{errors.name}</p> : null}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email"
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
          required
          placeholder="Create a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className={`mt-1 block w-full rounded-md shadow-sm focus:ring-blue-500 ${
            errors.password ? "border-red-500 focus:border-red-500" : "border-gray-300 focus:border-blue-500"
          }`}
        />
        {errors.password ? <p className="mt-1 text-sm text-red-600">{errors.password}</p> : null}
      </div>

      <RegisterButton />
    </form>
  );
};

export default RegisterForm;
