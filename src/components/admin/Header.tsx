"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import NavLinks from "@/components/admin/NavLinks";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full h-14 bg-neutral-800 fixed top-0 z-50 flex items-center justify-end px-4 md:justify-center">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="md:hidden text-white cursor-pointer"
        aria-label="Open menu"
      >
        <Menu />
      </button>

      <nav className="hidden md:flex">
        <NavLinks closeMenu={() => setIsOpen(false)} />
      </nav>

      {isOpen && (
        <>
          <div className="fixed inset-0 bg-neutral-800 opacity-30 z-40" onClick={() => setIsOpen(true)} />
          <div className="fixed right-0 top-0 h-full w-64 bg-neutral-800 z-50 p-6 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-white self-end cursor-pointer"
              aria-label="Close menu"
            >
              <X />
            </button>

            <NavLinks closeMenu={() => setIsOpen(false)} />
          </div>
        </>
      )}
    </header>
  );
}
