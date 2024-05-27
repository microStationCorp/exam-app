import { User } from "@prisma/client";
import { getJwtToken } from "./getJwtTokens";
import { cookies } from "next/headers";

export const cookieToken = async (user: User) => {
  const token = await getJwtToken(user.id);
  const options = {
    expires: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  cookies().set("auth-token", token, options);

  return token;
};
