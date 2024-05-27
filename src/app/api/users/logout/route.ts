import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  cookies().set("auth-token", "", { expires: new Date(0) });
  return NextResponse.redirect(url);
}