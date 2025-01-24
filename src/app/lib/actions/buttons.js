"use server";

import { signIn, signOut } from "@/app/lib/auth";

export const login = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};