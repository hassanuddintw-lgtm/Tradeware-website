"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { usePathname } from "next/navigation";
import { routes } from "@/config/routes";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const paths = pathname.split("/").filter((path) => path !== "");

    return (
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-8 font-body">
            <Link href={routes.home} className="flex items-center gap-1 hover:text-cyan-500 transition-colors cursor-pointer">
                <Home className="h-3 w-3" />
                <span>Home</span>
            </Link>

            {paths.map((path, index) => {
                const href = `/${paths.slice(0, index + 1).join("/")}`;
                const isLast = index === paths.length - 1;
                const isNumeric = !isNaN(Number(path));
                const name = isNumeric ? `Stock #${path}` : path.replace(/-/g, " ");

                return (
                    <div key={path} className="flex items-center gap-2">
                        <ChevronRight className="h-3 w-3 text-gray-600" />
                        {isLast ? (
                            <span className="text-cyan-500 italic">{name}</span>
                        ) : (
                            <Link href={href} className="hover:text-cyan-500 transition-colors cursor-pointer">
                                {name}
                            </Link>
                        )}
                    </div>
                );
            })}
        </nav>
    );
}
