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
  return (
    <div className="flex">
      <div>{children}</div>
    </div>
  );
}
