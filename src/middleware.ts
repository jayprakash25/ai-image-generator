import { NextResponse } from "next/server";
import  { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (token) {
    if (
      url.pathname === "/login" ||
      url.pathname === "/"
    ) {
      return NextResponse.redirect(new URL("/explore", request.url));
    }

  } else {
    // Redirect unauthenticated users away from protected pages
    if (url.pathname.startsWith('/explore')) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }


  return NextResponse.next()
}

// See "Matching Paths" 
export const config = {
  matcher: ["/signin", "/","/login", "/explore", "/generate", "/profile"],
};
