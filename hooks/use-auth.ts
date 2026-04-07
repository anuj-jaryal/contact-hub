"use client"
import useSWR from "swr";
import axios from "@/lib/axios";
import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { User, ValidationErrors } from "@/types";
import { AxiosError, AxiosResponse } from 'axios';


// Define types for function arguments
interface AuthProps {
  middleware?: string;
  redirectIfAuthenticated?: string;
}

interface RegisterProps {
  setErrors: (errors: ValidationErrors) => void;
  [key: string]: any; // This allows for additional properties
}

interface LoginProps {
  setErrors: (errors: ValidationErrors) => void;
  setStatus: (status: string | null) => void;
  [key: string]: any; // This allows for additional properties
}

interface ForgotPasswordProps {
  setErrors: (errors: ValidationErrors) => void;
  setStatus: (status: string | null) => void;
  email: string;
}

interface ResetPasswordProps {
  setErrors: (errors: ValidationErrors) => void;
  setStatus: (status: string | null) => void;
  [key: string]: any; // This allows for additional properties
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: AuthProps = {}) => {
  const router = useRouter();
  const params = useParams();

  const {
    data: user,
    error,
    mutate,
  } = useSWR<User | null>("/api/user", () =>
    axios
      .get("/api/user")
      .then((res:AxiosResponse<{}>) => res.data)
      .catch((error:AxiosError) => {
        if (error.response?.status !== 409) throw error;

        router.push("/verify-email");
      })
    
  );

  const csrf = () => axios.get("/sanctum/csrf-cookie");

  const register = async ({ setErrors, ...props }:RegisterProps) => {
    await csrf()

    setErrors({});

    axios
      .post("/register", props)
      .then(() => mutate())
      .catch((err:AxiosError<{errors:{}}>) => {
        if (err.response?.status !== 422) throw error;
        setErrors(err.response.data.errors);
      });
  };

  const login = async ({ setErrors, setStatus, ...props }: LoginProps) => {
    await csrf()

    setErrors({});
    setStatus(null);

    axios
      .post("/login", props)
      .then(() => mutate())
      .catch((err:AxiosError<{errors:{}}>) => {
        if (err.response?.status !== 422) throw error;
        setErrors(err.response.data.errors);
      });
  };

  const forgotPassword = async ({ setErrors, setStatus, email }: ForgotPasswordProps) => {
    await csrf();

    setErrors({});
    setStatus(null);

    axios
      .post("/forgot-password", { email })
      .then((response:AxiosResponse<{status:'string'}>) => setStatus(response.data.status))
      .catch((error:AxiosError<{errors:{}}>) => {
        if (error.response?.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resetPassword = async ({ setErrors, setStatus, ...props }:ResetPasswordProps) => {
    await csrf();

    setErrors({});
    setStatus(null);

    axios
      .post("/reset-password", { token: params.token, ...props })
      .then((response:AxiosResponse<{status:'string'}>) =>
        router.push("/login?reset=" + btoa(response.data.status))
      )
      .catch((error:AxiosError<{errors:{}}>) => {
        if (error.response?.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const resendEmailVerification = ({ setStatus }:{ setStatus: (status: string) => void }) => {
    axios
      .post("/email/verification-notification")
      .then((response:AxiosResponse<{status:'string'}>) => setStatus(response.data.status));
  };

  const logout = async () => {
    if (!error) {
      await axios.post("/logout").then(() => mutate());
    }

    window.location.pathname = "/login";
  };

  useEffect(() => {
    if (middleware === "guest" && redirectIfAuthenticated && user)
      router.push(redirectIfAuthenticated || '/dashboard');
    if (window.location.pathname === "/verify-email" && user?.email_verified_at)
      router.push(redirectIfAuthenticated||"/dashboard");
    if (middleware === "auth" && error) logout();
  }, [user, error]);

  return {
    user,
    register,
    login,
    forgotPassword,
    resetPassword,
    resendEmailVerification,
    logout,
  };
};
