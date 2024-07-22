import { NextResponse } from "next/server";
import  { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  console.log(token, "token")

  if (token) {
    if (
      url.pathname === "/login"
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

  } else {
    // Redirect unauthenticated users away from protected pages
    if (url.pathname === "/" ||
      url.pathname === "/profile" ||
      url.pathname === "/generate") {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }


  return NextResponse.next()
}

// See "Matching Paths" 
export const config = {
  matcher: ["/","/login", "/explore", "/generate", "/profile"],
};
