"use client";

import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const loginAction = async () => {
    axios
      .post(
        "/api/users/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        router.push("/dashboard");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="absolute border-2 m-auto top-0 bottom-0 left-0 right-0 w-72
        h-56 flex flex-col justify-evenly items-center"
    >
      <span className="capitalize">login page</span>
      <input
        placeholder="email"
        type="text"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-2 border-black bg-slate-200 focus:bg-slate-100 rounded"
      />
      <input
        value={password}
        placeholder="password"
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        className="border-2 border-black bg-slate-200 focus:bg-slate-100 rounded"
      />
      <button
        onClick={loginAction}
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        Login
      </button>
      <span>
        New User?{" "}
        <Link
          href="/signup"
          className="text-blue-600 visited:text-purple-600 hover:underline"
        >
          go to Sign Up
        </Link>
      </span>
    </div>
  );
}
