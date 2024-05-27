"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React from "react";

function Dashboard() {
  const router = useRouter();
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
    </div>
  );
}

export default Dashboard;
