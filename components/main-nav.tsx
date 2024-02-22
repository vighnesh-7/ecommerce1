'use client'
import React from "react";
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { cn } from "@/lib/utils";

export function MainNav({
    className,
    ...props
}:React.HtmlHTMLAttributes<HTMLElement>){
    const pathname = usePathname()
    const params  = useParams();

    const routes = [
        {
            href : `/${params.storeId}/settings`,
            label:'Settings',
            active:pathname===`/${params.storeId}/settings`
        }
    ]
    
    return (
        <nav
        className={cn("flex items-center space-x-4 lg:space-x-6 mx-6",className)}
        >
            {
                routes.map((route)=>(
                    <Link
                    key={route.href}
                    href={route.href}
                    className={cn("text-sm font-medium transition-colors hover:text-blue-700",
                    route.active ? 'text-black dark:text-white' : 'text-gray-500'
                    )}
                    >
                        {route.label}
                    </Link>
                ))
            }
        </nav>
    )
}


