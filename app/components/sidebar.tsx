'use client'
import SidebarHeader from "./sidebarheader"
import SideFooter from "./sidefooter"
import SideMain from "./sidemain"
export default function SideBar(){
    return(
        <div className="flex flex-col h-screen">

            <SidebarHeader className="z-10"/>
            <div className="flex flex-1 pt-20">
                <SideMain />
            </div>
            <SideFooter className="z-10"/>
            
        </div>
    )
}