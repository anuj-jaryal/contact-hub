// @ts-nocheck
import useSWR from 'swr';
import axios from '@/lib/axios';
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export const useAuth= ({ middleware, redirectIfAuthenticated }: { middleware?: string; redirectIfAuthenticated?: string } = {})=> {
  const router = useRouter();
  const { data:user, error, isLoading, mutate } = useSWR(`/me`, () =>
    axios
      .get("/me")
      .then((res) => res.data)
      .catch((err) => {
        if (err.response.status !== 409) throw err;

        router.push("/verify-email");
      })
  );

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated);
    if (window.location.pathname === "/verify-email" && user?.email_verified_at)
      router.push(redirectIfAuthenticated);
    if (middleware === "auth" && error) logout();
  }, [user, error]);
   
  return {
    user,
    isLoading,
    isError: error,
    mutate
  }
}