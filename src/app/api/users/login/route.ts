import { prisma } from "@/utils/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getJwtToken } from "@/utils/getJwtTokens";

export async function POST(req: NextRequest, res: NextResponse) {
  const { email, password } = await req.json();
  if (!email || !password) {
    return NextResponse.json(
      { error: "please provide credentials" },
      { status: 401 }
    );
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return NextResponse.json(
        { error: "please provide correct credentials" },
        { status: 401 }
      );
    }

    const isValidPassword = bcrypt.compareSync(password, user.password);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "incorrect password" },
        { status: 401 }
      );
    }

    const token = await getJwtToken(user);
    const options = {
      expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    };

    const response = NextResponse.json(
      {
        data: {
          success: true,
          user: {
            name: user.name,
            email: user.email,
          },
        },
      },
      { status: 200 }
    );
    response.cookies.set("auth-token", token, options);
    return response;
  } catch (err) {
    return NextResponse.json({ error: "server error" }, { status: 500 });
  }
}
