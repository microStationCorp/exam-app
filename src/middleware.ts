import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./utils/verifyToken";

const forAuthorised = ["/profile"];
const forUnauthorised = ["/login", "/signup"];

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  const authToken = cookies().get("auth-token")?.value;
  const pathname = request.nextUrl.pathname;
  const { isVerified, payload } = await verifyToken(authToken!);

  if (!isVerified && forAuthorised.indexOf(pathname) > -1) {
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  console.log(payload);

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/profile", "/login", "/signup"],
};
