import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Header() {
  const linkClass =
    "hover:bg-white ease-in-out transition-all text-white hover:text-neutral-800 px-4 py-4 cursor-pointer";

  return (
    <header className="w-full bg-neutral-800 flex justify-center fixed top-0">
      <nav className="flex">
        <Link href="/admin" className={linkClass}>
          Home
        </Link>
        <Link href="/admin/orders" className={linkClass}>
          Orders
        </Link>
        <Link href="/admin/products" className={linkClass}>
          Products
        </Link>
        <Link href="/admin/collections" className={linkClass}>
          Collections
        </Link>
        <Link href="/admin/customers" className={linkClass}>
          Customers
        </Link>
        <LogoutButton style={linkClass} />
      </nav>
    </header>
  );
}
