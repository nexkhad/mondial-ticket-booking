import { NextRequest, NextResponse } from "next/server";
import NextAuth from "next-auth";
import authConfig from "./auth.config";
import {
  DEFAULT_ADMIN_REDIRECT,
  DEFAULT_LOGIN_REDIRECT,
  adminRoutePrefix,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from "./routes";
import { getCurrentRole } from "./lib/auth";
import { UserRole } from "@prisma/client";

const { auth } = NextAuth(authConfig);

export default auth(async (req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const role = await getCurrentRole();
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAdminRoute = nextUrl.pathname.startsWith(adminRoutePrefix);
  const isUserRoute = !nextUrl.pathname.startsWith(adminRoutePrefix) && !isPublicRoute;
  const isAdmin= role === UserRole.ADMIN
  const isUser= role === UserRole.USER

  if (nextUrl.pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  
  if(nextUrl.pathname === '/admin'){
    return NextResponse.redirect(new URL(DEFAULT_ADMIN_REDIRECT, nextUrl))
  }

  console.log(nextUrl.pathname);
  console.log(isAdminRoute, " isAdminRoute");
  console.log(isPublicRoute, " isPublicRoute");
  console.log(isUserRoute, " isUserRoute");
  

    // Skip API routes
  // if (nextUrl.pathname.startsWith('/api/')) {
  //   return NextResponse.next();
  // }

  
  if (isAuthRoute) {
    
    if (isLoggedIn && role !== UserRole.USER) {
      return NextResponse.redirect(new URL(DEFAULT_ADMIN_REDIRECT, nextUrl));
    }
    if (isLoggedIn && role === UserRole.USER) {
      return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return;
  }

  console.log(role, " role");
  if (isUserRoute && isAdmin) {

    console.log('redirecting to admin from user to : '+ new URL(DEFAULT_ADMIN_REDIRECT, nextUrl))
    console.log(nextUrl.pathname);
    return NextResponse.redirect(new URL(DEFAULT_ADMIN_REDIRECT, nextUrl));
  }


  if(isAdminRoute && isUser){
    console.log(role, " role");

    return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
  }

  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL("/auth/login", nextUrl));
  }
});




export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};