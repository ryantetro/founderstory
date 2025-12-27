"use client";

import Link from "next/link";
import { Menu, X, Rocket } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/app/actions";

const navigation: { name: string; href: string }[] = [];

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="absolute inset-x-0 top-0 z-50">
            <nav
                className="flex items-center justify-between p-6 lg:px-8 bg-zinc-950/20 backdrop-blur-md"
                aria-label="Global"
            >
                <div className="flex lg:flex-1">
                    <Link
                        href="/"
                        className="-m-1.5 p-1.5 flex items-center gap-2"
                        onClick={() => trackEvent("nav_logo_click")}
                    >
                        <Rocket className="h-8 w-8 text-white" />
                        <span className="text-xl font-bold tracking-tight text-white">FounderStory</span>
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white/70"
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Menu className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            onClick={() => trackEvent(`nav_link_click_${item.name.toLowerCase()}`)}
                            className="text-sm font-semibold leading-6 text-white/70 hover:text-white transition-colors"
                        >
                            {item.name}
                        </a>
                    ))}
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Link
                        href="/#waitlist"
                        onClick={() => trackEvent("nav_login_click")}
                        className="text-sm font-semibold leading-6 text-white hover:opacity-80 transition-opacity"
                    >
                        Log in <span aria-hidden="true">&rarr;</span>
                    </Link>
                </div>
            </nav>
            {/* Mobile menu */}
            <div
                className={cn(
                    "lg:hidden",
                    mobileMenuOpen ? "fixed inset-0 z-50" : "hidden"
                )}
            >
                <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-zinc-950 px-6 py-6 sm:max-w-sm border-l border-white/10">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
                            <Rocket className="h-8 w-8 text-white" />
                            <span className="text-xl font-bold tracking-tight text-white">FounderStory</span>
                        </Link>
                        <button
                            type="button"
                            className="-m-2.5 rounded-md p-2.5 text-white/70"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            <span className="sr-only">Close menu</span>
                            <X className="h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-white/5">
                            <div className="space-y-2 py-6">
                                {navigation.map((item) => (
                                    <a
                                        key={item.name}
                                        href={item.href}
                                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white/70 hover:bg-white/5 hover:text-white"
                                    >
                                        {item.name}
                                    </a>
                                ))}
                            </div>
                            <div className="py-6">
                                <Link
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-white hover:bg-white/5"
                                >
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}
