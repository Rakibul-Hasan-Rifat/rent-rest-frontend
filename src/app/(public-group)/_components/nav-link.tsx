"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavLink = ({ item }: { item: { href: string, label: string } }) => {

    const pathname = usePathname();
    console.log(pathname)

    const { href, label } = item;

    return (
        <Link
            href={href}
            className={`px-3 py-2 text-sm transition-colors hover:outline outline-destructive hover:bg-rose-400/10 hover:text-foreground ${pathname === href ? 'bg-muted font-medium text-foreground' : 'text-muted-foreground'}`}
        >
            {label}
        </Link>
    )
}

export default NavLink;