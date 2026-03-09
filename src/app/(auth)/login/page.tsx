// This is a server component by default
 
import React from "react";
import LoginForm from "../../_components/LoginForm";
import Link from "next/link";

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const LoginPage = async ({ searchParams }: LoginPageProps) => {
  const { error } = await searchParams;

  const errorMap: Record<string, string> = {
    "invalid-credentials": "Invalid email or password.",
    "missing-fields": "Please fill email and password.",
  };

  const errorMessage = error ? errorMap[error] ?? "Unable to login." : null;

  return (
    <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      {errorMessage ? (
        <p className="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{errorMessage}</p>
      ) : null}
      <LoginForm />
      <p className="mt-4 text-center" >
        Don't have an account?{" "} 
        <Link href="/register" className="text-blue-600 hover:underline" >
          Register
        </Link>
      </p>
    </div>

  );     
};

export default LoginPage;

// server components are rendered on the server by default, so we can use server-side features like fetching data from a database or an API without worrying about client-side performance. This makes it easier to build fast and efficient applications.
// if you want to render a component on the client side, you can use the "use client" directive at the top of the file. This will tell Next.js to render the component on the client side instead of the server. Client components are useful for interactive features that require client-side state or event handling, such as forms, modals, or animations.
// server acts as a default for server components, so you don't need to add any special directive to create a server component. However, if you want to create a client component, you need to add the "use client" directive at the top of the file. This will tell Next.js to render the component on the client side instead of the server.