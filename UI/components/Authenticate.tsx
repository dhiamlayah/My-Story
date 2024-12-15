"use client";

import Link from "next/link";

export default function Authenticate() {
  return (
    <div className=" justify-end">
      <Link href='/login' className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 mx-2 px-4 border border-gray-500 hover:border-transparent rounded">
        LogIn
      </Link>
      <Link href='/register' className="bg-transparent hover:bg-gray-500 text-gray-700 font-semibold hover:text-white py-1 px-4 border border-gray-500 hover:border-transparent rounded">
        SignIn
      </Link>
    </div>
  );
}
