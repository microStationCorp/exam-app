"use server";

import * as jose from "jose";
import { cookies } from "next/headers";
import { prisma } from "./prisma";

export const verifyToken = async (token: string) => {
  try {
    const payload = await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET || ""),
      { algorithms: ["HS256"] }
    );

    return { isVerified: true, payload };
  } catch {
    return { isVerified: false, payload: null };
  }
};

export const getSession = async () => {
  const authToken = cookies().get("auth-token")?.value;
  const { isVerified, payload } = await verifyToken(authToken!);

  if (!isVerified) {
    return null;
  } else {
    const user = await prisma.user.findUnique({
      where: {
        id: payload!.payload.userId as string,
      },
    });

    return {
      id: user?.id,
      email: user?.email,
      name: user?.name,
      role: user?.role,
    };
  }
};
