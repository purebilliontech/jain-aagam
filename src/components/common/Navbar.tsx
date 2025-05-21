"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const navLinks = [
    {
        title: "Home",
        href: "/",
    },
    {
        title: "Bhagwan Mahavir",
        href: "/bhagwan-mahavir",
    },
    {
        title: "Art Gallery",
        href: "/art-gallery",
    },
    {
        title: "Articles",
        href: "/blogs",
    },
    {
        title: "Videos",
        href: "/videos",
    }
]

const Navbar = () => {
    const [pathname, setPathname] = useState("/");
    const [toggle, setToggle] = useState(false);

    const path = usePathname();

    useEffect(() => {
        setPathname(path);
    }, [path]);

    return (
        <>
            <nav className="w-full">
                <div className="flex max-w-7xl mx-auto flex-col justify-between overflow-x-hidden md:flex-row">

                    <div className="flex h-20 items-center justify-between p-5 max-md:border-b">
                        <Link href={'/'}>
                            <p className="font-semibold font-sans text-xl">JAIN AGAM</p>
                        </Link>

                        <div
                            onClick={() => {
                                setToggle(!toggle);
                            }}
                            className="flex h-8 w-8 flex-col justify-evenly md:hidden"
                        >
                            <div className="line h-0.5 w-full bg-primary"></div>
                            <div className="line h-0.5 w-full bg-primary"></div>
                            <div className="line h-0.5 w-full bg-primary"></div>
                        </div>
                    </div>
                    <div
                        className={`links  ${toggle ? "translate-x-0 " : "max-md:translate-x-[100vw] max-md:hidden"} absolute right-0 z-50 flex flex-col items-center gap-10 bg-white
                    p-5 transition-all duration-500 ease-in-out max-md:top-20 max-md:h-[90vh] max-md:w-2/3 max-md:border-l md:relative md:flex-row overflow-x-hidden`}
                    >

                        {navLinks.map((link) => (
                            <Link key={link.title} href={link.href} onClick={() => { setToggle(false) }}>
                                <p
                                    className={`font-medium ${pathname === link.href ? "text-primary-ui" : "text-heading"
                                        } hover:text-primary-ui`}
                                >
                                    {link.title}
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Navbar;