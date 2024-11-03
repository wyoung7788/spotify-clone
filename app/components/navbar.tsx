'use client'
import React, {useState} from "react";
import { SidebarData } from "./navbardata";
import Link from "next/link";
import { IconContext } from "react-icons";

export default function NavBar(){

    return(
        <IconContext.Provider value={{color: "undefined"}}>
            <div className="nav-bar">
            <ul className="nav-menu-items flex flex-col items-center text-gray-300">
                {SidebarData.map((item, index) => {
                    return(
                        <li key={index} className={item.cName} >
                            <Link href={item.path}>
                            
                            <span className="flex gap-3">
                                <div className="mt-1.5">
                            {item.icon}
                            </div>
                            <div className="flex">
                                {item.title}
                                </div>
                                </span>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            </div>
        </IconContext.Provider>
    )
}