import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Home, Mail, ArrowRight } from "lucide-react";
import { RiFacebookLine, RiInstagramLine, RiTwitterLine } from "@remixicon/react";


const EXPLORE_LINKS = [
    { label: "Browse properties", href: "/properties" },
    { label: "Categories", href: "/categories" },
    { label: "Popular cities", href: "/cities" },
    { label: "How it works", href: "/how-it-works" },
];

const COMPANY_LINKS = [
    { label: "About us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
];

const SOCIALS = [
    { icon: RiFacebookLine, href: "https://facebook.com", label: "Facebook" },
    { icon: RiInstagramLine, href: "https://instagram.com", label: "Instagram" },
    { icon: RiTwitterLine, href: "https://twitter.com", label: "Twitter" },
    { icon: Mail, href: "mailto:hello@basha.com", label: "Email" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="w-full bg-neutral-900 text-neutral-300">
            <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-12 md:px-10 md:py-14">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[2fr_1fr_1fr_1.2fr] lg:gap-8">
                    {/* Brand */}
                    <div>
                        <Link href="/" className="flex items-center gap-2 text-white">
                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                <Home className="h-4 w-4" />
                            </span>
                            <span className="text-lg font-semibold">Basha</span>
                        </Link>
                        <p className="mt-3 max-w-xs text-sm leading-relaxed text-neutral-400">
                            Find verified rentals across Bangladesh — from city apartments
                            to beachside stays.
                        </p>
                        <div className="mt-5 flex flex-wrap items-center gap-3">
                            {SOCIALS.map(({ icon: Icon, href, label }) => (
                                <Link
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-neutral-700 text-neutral-400 transition-colors hover:border-primary hover:text-primary"
                                >
                                    <Icon className="h-4 w-4" />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Link columns — stack on mobile, 3-up on tablet, dissolve into the
              parent grid's own columns on desktop (`lg:contents`). */}
                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 lg:contents">
                        <div>
                            <h4 className="text-sm font-semibold text-white">Explore</h4>
                            <ul className="mt-4 space-y-3">
                                {EXPLORE_LINKS.map(({ label, href }) => (
                                    <li key={label}>
                                        <Link
                                            href={href}
                                            className="text-sm text-neutral-400 transition-colors p-0.5 hover:border-b-2 border-primary"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h4 className="text-sm font-semibold text-white">Company</h4>
                            <ul className="mt-4 space-y-3">
                                {COMPANY_LINKS.map(({ label, href }) => (
                                    <li key={label}>
                                        <Link
                                            href={href}
                                            className="text-sm text-neutral-400 transition-colors hover:border-b-2 border-primary pb-0.5"
                                        >
                                            {label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-white">Stay updated</h4>
                            <p className="mt-4 text-sm text-neutral-400">
                                New listings and rental tips, straight to your inbox.
                            </p>
                            <form className="mt-4 flex w-full max-w-sm gap-2">
                                <Input
                                    type="email"
                                    placeholder="you@email.com"
                                    className="min-w-0 flex-1 border-neutral-700 bg-neutral-800 text-sm text-white focus-visible:ring-primary"
                                />
                                <Button type="submit" size="icon" className="shrink-0 hover:bg-primary hover:text-primary-foreground" variant="destructive">
                                    <ArrowRight className="h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>

                <Separator className="my-8 bg-neutral-800 sm:my-10" />

                <div className="flex flex-col items-center gap-4 text-center text-sm text-neutral-500 sm:flex-row sm:justify-between sm:text-left">
                    <p>&copy; {year} Basha. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="transition-colors hover:text-rose-500/70">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="transition-colors hover:text-rose-500/70">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}