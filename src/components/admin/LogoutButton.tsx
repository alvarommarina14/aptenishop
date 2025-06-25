"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

type propType = {
  styleLink: string;
  styleIconLink: string;
};

export default function LogoutButton({ styleLink, styleIconLink }: propType) {
  return (
    <button onClick={() => signOut({ callbackUrl: "/auth/login" })} className={styleLink}>
      <span>
        <LogOut className={styleIconLink} />
      </span>
      Logout
    </button>
  );
}
