import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/verifyToken";

const forAuthorised = ["/dashboard", "/logout"];
const forUnauthorised = ["/login", "/signup"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest, res: NextResponse) {
  const url = request.nextUrl.clone();

  const authToken = cookies().get("auth-token")?.value;
  const pathname = request.nextUrl.pathname;
  const { isVerified, payload } = await verifyToken(authToken!);

  if (!isVerified && isPresent(forAuthorised, pathname)) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (isVerified && isPresent(forUnauthorised, pathname)) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

function isPresent(sampleArray: string[], pathname: string) {
  return sampleArray.some((value) => pathname.startsWith(value));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup", "/logout"],
};
