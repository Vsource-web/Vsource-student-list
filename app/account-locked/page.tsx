"use client";

import { authService } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

export default function AccountLockedPage() {
  const router = useRouter();

  useEffect(() => {
    const lockEmail = localStorage.getItem("lockEmail");

    if (!lockEmail) {
      router.replace("/auth/login");
      return;
    }

    const checkStatus = async () => {
      try {
        const res = await authService.checkLockout(lockEmail);

        if (res?.data?.data?.locked === false) {
          localStorage.removeItem("lockEmail");
          router.replace("/auth/login");
        }
      } catch (err) {
        toast.error(
          "Unable to verify your account status. Please check your connection and try again."
        );
      }
    };

    checkStatus();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <h1 className="text-2xl font-bold text-red-600">Account Locked</h1>
      <p className="mt-4 text-gray-700">
        Your account has been locked due to too many unsuccessful login
        attempts.
      </p>
      <p className="mt-2 text-gray-500">Please contact administrator.</p>
    </div>
  );
}
