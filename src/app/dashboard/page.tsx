"use client";

import { getSession } from "@/utils/verifyToken";
import axios from "axios";
import { useRouter, redirect } from "next/navigation";
import React, { useEffect, useState } from "react";

function Dashboard() {
  const [session, setSession] = useState<any>();
  const router = useRouter();

  useEffect(() => {
    const takeSession = async () => {
      setSession(await getSession());
    };

    takeSession();
  }, []);

  const logout = async () => {
    axios
      .get("/api/users/logout")
      .then((res) => {
        if (res.data.success) {
          router.push("/");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div>Profile page</div>
      <div>
        <button onClick={logout} className="bg-black text-red-50">
          logout
        </button>
      </div>
      <div>{JSON.stringify(session)}</div>
    </div>
  );
}

export default Dashboard;
