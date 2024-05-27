import { getSession } from "@/utils/verifyToken";
import React from "react";

async function Profile() {
  const session = await getSession();
  console.log(session);

  return <div>Profile page</div>;
}

export default Profile;
