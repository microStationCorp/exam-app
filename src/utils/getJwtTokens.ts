import { User } from "@prisma/client";
import { SignJWT } from "jose";

export const getJwtToken = async (user: User) => {
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);

  return await new SignJWT({
    userId: user.id,
    role: user.role,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(secretKey);
};
