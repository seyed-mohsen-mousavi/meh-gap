import { Metadata } from "next";
import Link from "next/link";
import React from "react";

function Home() {
  return (
    <div className="flex size-full items-center justify-center">
      <Link href={"/@ali"}>شروع چت </Link>
    </div>
  );
}

export default Home;
