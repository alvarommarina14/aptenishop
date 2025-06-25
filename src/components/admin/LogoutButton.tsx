"use client";

import { signOut } from "next-auth/react";

type propType = {
  style: string;
};

export default function LogoutButton({ style }: propType) {
  return (
    <button onClick={() => signOut({ callbackUrl: "/auth/login" })} className={style}>
      Logout
    </button>
  );
}
