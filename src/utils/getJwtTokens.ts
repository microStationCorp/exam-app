import { SignJWT } from "jose";

export const getJwtToken = async (userId: string) => {
  const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);
  
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1 day from now")
    .sign(secretKey);
};
