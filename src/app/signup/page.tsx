"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Signup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupAction = async () => {
    console.log({ name, email, password });
    axios
      .post("/api/users/signup", { name, email, password })
      .then((res) => {
        console.log(res);
        router.push("/login");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex">
      <div>Signup</div>
      <input
        type="text"
        name="name"
        id="name"
        value={name}
        className="border-2 border-black bg-slate-200 focus:bg-slate-100"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="email"
        type="text"
        name="email"
        id="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-2 border-black bg-slate-200 focus:bg-slate-100"
      />
      <input
        value={password}
        placeholder="password"
        type="password"
        name="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        className="border-2 border-black bg-slate-200 focus:bg-slate-100"
      />
      <button
        onClick={signupAction}
        type="button"
        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        sign up
      </button>
    </div>
  );
}

export default Signup;
