import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "@/utils/prisma";
import { getJwtToken } from "@/utils/getJwtTokens";

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "please provide proper fields" },
        { status: 500 }
      );
    }

    const alreadyUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (alreadyUser) {
      return NextResponse.json({ message: "already user" }, { status: 500 });
    }

    const salt = bcryptjs.genSaltSync(10);
    const hash = bcryptjs.hashSync(password, salt);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hash,
      },
    });

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
  } catch (error) {
    console.log("catch error log");
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
