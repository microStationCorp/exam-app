import * as jose from "jose";

export const verifyToken = async (token: string) => {
  try {
    await jose.jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET || "")
    );

    return true;
  } catch {
    return false;
  }
};
