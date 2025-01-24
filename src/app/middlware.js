import { NextResponse } from "next/server";

import { auth } from "@/app/lib/auth";

const protectedRoutes = ["/"];

export default async function middleware(request) {
  const session = await auth();

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (isProtected && !session) {
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  return NextResponse.next();
}