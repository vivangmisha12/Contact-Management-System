"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";

const successMessages: Record<string, string> = {
  login: "Successfully logged in!",
  register: "Account created successfully!",
  create: "Contact created successfully!",
  update: "Contact updated successfully!",
  delete: "Contact deleted successfully!",
};

export default function ToastHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const success = searchParams.get("success");
    if (success && successMessages[success]) {
      toast.success(successMessages[success]);
      // Clear the URL param after showing toast
      const url = new URL(window.location.href);
      url.searchParams.delete("success");
      window.history.replaceState({}, "", url.toString());
    }
  }, [searchParams]);

  return null;
}
