import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { prisma } from "@/utils/prisma";
import { cookieToken } from "@/utils/cookieToken";

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

    const token = cookieToken(user);

    return NextResponse.json(
      {
        data: {
          success: true,
          token,
          user: {
            name: user.name,
            email: user.email,
          },
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log("catch error log");
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
