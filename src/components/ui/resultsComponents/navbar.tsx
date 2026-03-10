"use client";

import { MoveLeft } from "lucide-react";
import Link from "next/link";

export function Navbar() {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  return (
    <nav className="bg-orange-200/10 backdrop-blur-xl border-b border-orange-100/20 p-4  fixed w-full top-0 left-0 z-50 shadow-lg">
      <div className="container mx-auto flex gap-5 items-center">
        <Link
          href="/"
          className=" cursor-pointer md:text-base text-sm font-medium border flex flex-row justify-center items-center gap-2 text-gray-900 border-gray-900 hover:bg-gray-900 hover:text-orange-50 px-2 py-1 rounded-md"
        >
          <MoveLeft size={20} />
          Back to Upload
        </Link>
        <div className="flex-1 flex flex-col ">
          <h1 className="text-orange-600 md:text-2xl text-lg font-bold">
            Resume Results
          </h1>
          <span className="text-xs text-gray-900">
            Analysis completed on {formattedDate}
          </span>
        </div>
      </div>
    </nav>
  );
}
