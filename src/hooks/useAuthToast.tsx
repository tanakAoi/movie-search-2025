import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export function useAuthToast() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const toastKey = `login-toast-shown-${session.user.id}`;
      if (!localStorage.getItem(toastKey)) {
        toast.success(`Welcome, ${session.user.username ?? "user"}!`);
        localStorage.setItem(toastKey, "true");
      }
    }

    if (status === "unauthenticated") {
      toast.info("You have logged out.");
      Object.keys(localStorage).forEach((key) => {
        if (key.startsWith("login-toast-shown-")) {
          localStorage.removeItem(key);
        }
      });
    }
  }, [session, status]);
}
