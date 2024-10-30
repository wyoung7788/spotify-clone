'use client'
import React, {useState} from "react";
import { SidebarData } from "./navbardata";
import Link from "next/link";
import { IconContext } from "react-icons";

export default function NavBar(){

    return(
        <IconContext.Provider value={{color: "undefined"}}>
            <div className="nav-bar">
            <ul className="nav-menu-items flex flex-col items-center">
                {SidebarData.map((item, index) => {
                    return(
                        <li key={index} className={item.cName}>
                            <Link href={item.path}>
                            <div>
                            {item.icon}
                            <span>{item.title}</span>
                            </div>
                            </Link>
                        </li>
                    )
                })}
            </ul>
            </div>
        </IconContext.Provider>
    )
}