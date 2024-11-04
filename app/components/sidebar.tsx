'use client'
import SidebarHeader from "./sidebarheader"
import SideFooter from "./sidefooter"
import SideMain from "./sidemain"
export default function SideBar(){
    return(
        <div>
            <SidebarHeader/>
            <SideMain/>
            <SideFooter/>
            
        </div>
    )
}