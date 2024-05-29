import { getSession } from "@/utils/verifyToken";
import Link from "next/link";
import React from "react";

async function Profile() {
  const session = await getSession();
  return (
    <>
      <div className="border-2 border-black text-center text-xl capitalize">
        hi ,{session?.name}
      </div>
      <div className="text-center text-blue-500">
        <Link href="/api/users/logout">logout</Link>
      </div>
    </>
  );
}

export default Profile;
