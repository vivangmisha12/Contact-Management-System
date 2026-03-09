import Link from "next/link";
import React from "react";
import RegisterForm from "../../_components/RegisterForm";

type RegisterPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const RegisterPage = async ({ searchParams }: RegisterPageProps) => {
  const { error } = await searchParams;

  const errorMap: Record<string, string> = {
    "missing-fields": "Please fill all required fields.",
    "email-already-exists": "This email is already registered.",
  };

  const errorMessage = error ? errorMap[error] ?? "Unable to register." : null;

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Create account</h1>

      {errorMessage ? (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
      ) : null}

      <RegisterForm />

      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
