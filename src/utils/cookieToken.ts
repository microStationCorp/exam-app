import { User } from "@prisma/client";
import { getJwtToken } from "./getJwtTokens";
import { cookies } from "next/headers";

export const cookieToken = (user: User) => {
  const token = getJwtToken(user.id);
  const options = {
    expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
    httpOnly: true,
  };

  cookies().set("token", token, options);

  return token;
};
