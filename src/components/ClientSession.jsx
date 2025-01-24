'use client';

import { AuthProvider } from "@/app/context/AuthContext";

        


export default function AuthProviderCom({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}