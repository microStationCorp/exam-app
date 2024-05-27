import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <span>home page</span>
      <Link href="/login" className="text-blue-600 visited:text-purple-600 hover:underline">
        goto login
      </Link>
      <Link href="/signup" className="text-blue-600 visited:text-purple-600 hover:underline">
        goto sign up
      </Link>
    </div>
  );
}
