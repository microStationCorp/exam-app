import { LogoutButton } from "@/app/component/logoutbutton";
import { getSession } from "@/utils/verifyToken";
import type { Metadata } from "next";
import { UserGroupIcon, QueueListIcon } from "@heroicons/react/24/outline";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  return (
    <div>
      <div className="border h-12 right-0 left-0 top-0 bg-gray-100 flex justify-between items-center">
        <div className="text-2xl ml-12 capitalize">
          {session?.name}&apos;s Dashboard
        </div>
        <div className="mr-8">
          <LogoutButton />
        </div>
      </div>
      <div className="flex">
        <div className="border bottom-0 h-screen w-20">
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
