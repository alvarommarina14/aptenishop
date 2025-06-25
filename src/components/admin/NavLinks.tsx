import Link from "next/link";
import LogoutButton from "@/components/admin/LogoutButton";
import { Tag, Tags, User, House, Inbox } from "lucide-react";

type propTypes = {
  closeMenu: () => void;
};

export default function NavLinks({ closeMenu }: propTypes) {
  const linkClass =
    "px-4 py-4 block text-start md:text-center cursor-pointer text-white transition-all flex gap-3 md:hover:bg-white md:hover:text-neutral-800 group";

  const iconLinkClass = "text-white md:group-hover:text-neutral-800 transition-all";

  const links = [
    { href: "/admin", label: "Home", icon: House },
    { href: "/admin/orders", label: "Orders", icon: Inbox },
    { href: "/admin/products", label: "Products", icon: Tag },
    { href: "/admin/collections", label: "Collections", icon: Tags },
    { href: "/admin/customers", label: "Customers", icon: User },
  ];

  return (
    <>
      {links.map((link) => {
        return (
          <Link href={link.href} key={link.label} className={linkClass} onClick={closeMenu}>
            <span>
              <link.icon className={iconLinkClass} />
            </span>
            {link.label}
          </Link>
        );
      })}
      <LogoutButton styleLink={linkClass} styleIconLink={iconLinkClass} />
    </>
  );
}
