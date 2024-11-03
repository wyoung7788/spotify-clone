import Link from "next/link.js";
import type { ReactNode } from "react";
import "./style.css";
import { Tab, TabList, TabPanel, Tabs } from "./tabs.tsx";

export default function Layout(props: { tabs: ReactNode }) {
  return (
    <main className="main bg-black">
      <h1 className="heading">Top Result</h1>
      <div className="wrapper bg-stone-900">
        <Tabs>
          <TabList className="bg-gray-500">
            <Tab href="/tracks">Hot</Tab>
            <Tab href="/artists">New</Tab>
          </TabList>
          <TabPanel>{props.tabs}</TabPanel>
        </Tabs>
        </div>
    </main>
  );
}
