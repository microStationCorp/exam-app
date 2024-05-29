"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

export const LogoutButton = () => {
  const router = useRouter();

  const logoutAction = async () => {
    axios.get("/api/users/logout").then((res) => {
      if (res.data.success) {
        router.push("/login");
      }
    });
  };
  
  return (
    <button
      type="button"
      className="py-1.5 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-300 hover:bg-gray-300 hover:text-grey-700 focus:z-10"
      onClick={logoutAction}
    >
      Log out
    </button>
  );
};
