"use client";

import { SignOutButton } from "@clerk/nextjs";
import {
  QueueListIcon,
  UserGroupIcon,
  UserIcon,
  ComputerDesktopIcon
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div>
      <div className="border h-12 right-0 left-0 top-0 bg-gray-100 flex justify-between items-center">
        <div className="text-2xl ml-12 capitalize">
          {JSON.stringify(pathname)}
        </div>
        <div className="mr-8">
          <SignOutButton>
            <button
              type="button"
              className="py-1.5 px-3 text-sm bg-red-200 font-bold rounded-lg border border-red-300 text-red-800 hover:bg-gray-300 hover:text-grey-700 focus:z-10"
            >
              Log out
            </button>
          </SignOutButton>
        </div>
      </div>
      <div className="flex">
        <div className="border bottom-0 h-screen w-20">
          <div>
            <Link href={"/dashboard"} passHref>
              <ComputerDesktopIcon className="size-10 mx-auto my-4" />
            </Link>
          </div>
          <hr />
          <div>
            <Link href={"/profile"} passHref>
              <UserIcon className="size-10 mx-auto my-4" />
            </Link>
          </div>
          <hr />
          <div>
            <UserGroupIcon className="size-10 mx-auto my-4" />
          </div>
          <hr />
          <div>
            <QueueListIcon className="size-10 mx-auto my-4" />
          </div>
          <hr />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default AdminLayout;
