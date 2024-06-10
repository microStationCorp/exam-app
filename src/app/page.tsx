import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col">
      <span>home page</span>
      <Link
        href="/sign-in"
        className="text-blue-600 visited:text-purple-600 hover:underline"
      >
        goto login
      </Link>
      <Link
        href="/sign-up"
        className="text-blue-600 visited:text-purple-600 hover:underline"
      >
        goto sign up
      </Link>
    </div>
  );
}
