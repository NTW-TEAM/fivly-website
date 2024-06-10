"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import SidebarLinkGroup from "./SidebarLinkGroup";
import {
  FaBuilding,
  FaChartPie,
  FaHandsHelping,
  FaList,
  FaMonero,
  FaRegCalendar,
  FaRegCalendarAlt,
  FaShieldAlt,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { SiCrowdsource, SiGooglemeet } from "react-icons/si";
import { FaB, FaFileShield } from "react-icons/fa6";
import { MdHowToVote, MdOutlineChairAlt, MdOutlineTypeSpecimen, MdOutlineViewList } from "react-icons/md";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== "Escape") return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    localStorage.setItem("sidebar-expanded", sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector("body")?.classList.add("sidebar-expanded");
    } else {
      document.querySelector("body")?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
        <Link href="/">
          <Image
            width={176}
            height={32}
            src={"/images/logo/logo.svg"}
            alt="Logo"
            priority
          />
        </Link>

        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls="sidebar"
          aria-expanded={sidebarOpen}
          className="block lg:hidden"
        >
          <svg
            className="fill-current"
            width="20"
            height="18"
            viewBox="0 0 20 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 8.175H2.98748L9.36248 1.6875C9.69998 1.35 9.69998 0.825 9.36248 0.4875C9.02498 0.15 8.49998 0.15 8.16248 0.4875L0.399976 8.3625C0.0624756 8.7 0.0624756 9.225 0.399976 9.5625L8.16248 17.4375C8.31248 17.5875 8.53748 17.7 8.76248 17.7C8.98748 17.7 9.17498 17.625 9.36248 17.475C9.69998 17.1375 9.69998 16.6125 9.36248 16.275L3.02498 9.8625H19C19.45 9.8625 19.825 9.4875 19.825 9.0375C19.825 8.55 19.45 8.175 19 8.175Z"
              fill=""
            />
          </svg>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Global Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              GESTION GLOBALE
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Type Activity --> */}
              <li>
                <Link
                  href="/activityType"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("activityType") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdOutlineTypeSpecimen />
                  Type Activités
                </Link>
              </li>
              {/* <!-- Menu Item Type Activity --> */}

              {/* <!-- Menu Item Activity --> */}
              <li>
                <Link
                  href="/activities"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("activities") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaRegCalendarAlt />
                  Activités
                </Link>
              </li>
              {/* <!-- Menu Item Activity --> */}

              {/* <!-- Menu Item members --> */}
              <li>
                <Link
                  href="/members"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("members") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaUsers />
                  Membres
                </Link>
              </li>
              {/* <!-- Menu Item Settings --> */}

              {/* <!-- Menu Item Locals --> */}
              <li>
                <Link
                  href="/locals"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("locals") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaBuilding />
                  Locaux
                </Link>
              </li>
              {/* <!-- Menu Item Locals --> */}

              {/* <!-- Menu Item Materials Model --> */}
              <li>
                <Link
                  href="/materials/model"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.endsWith("materials/model") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdOutlineTypeSpecimen />
                  Model de Matériels
                </Link>
              </li>
              {/* <!-- Menu Item Materials Model --> */}

              {/* <!-- Menu Item Materials --> */}
              <li>
                <Link
                  href="/materials"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.endsWith("materials") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdOutlineChairAlt />
                  Matériels
                </Link>
              </li>
              {/* <!-- Menu Item Roles & Scopes --> */}

              {/* <!-- Menu Item Roles & Scopes --> */}
              <li>
                <Link
                  href="/permissions"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("permissions") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaShieldAlt />
                  Permissions
                </Link>
              </li>
              {/* <!-- Menu Item Roles & Scopes --> */}
            </ul>
          </div>

          {/* <!-- Finance Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              FINANCES
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item DashBoard --> */}
              <li>
                <Link
                  href="/finances"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("finances") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaChartPie />
                  Dashboard Général
                </Link>
              </li>
              {/* <!-- Menu Item DashBoard --> */}

              {/* <!-- Menu Item Dons --> */}
              <li>
                <Link
                  href="/dons"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("dons") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <GiReceiveMoney />
                  Gestion des dons
                </Link>
              </li>
              {/* <!-- Menu Item Dons --> */}

              {/* <!-- Menu Item CrowdFunding --> */}
              <li>
                <Link
                  href="/crowdfunding"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("crowdfunding") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <SiCrowdsource />
                  Crowdfunding
                </Link>
              </li>
              {/* <!-- Menu Item CrowdFunding --> */}

              {/* <!-- Menu Item Cotisation --> */}
              <li>
                <Link
                  href="/cotisation"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("cotisation") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaHandsHelping />
                  Cotisation
                </Link>
              </li>
              {/* <!-- Menu Item Cotisation --> */}
            </ul>
          </div>

          {/* <!-- Assemblées Général Group --> */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              ASSEMBLÉES GÉNÉRALES
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item AG --> */}
              <li>
                <Link
                  href="/ag"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("ag") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <SiGooglemeet />
                  Assemblées Générales
                </Link>
              </li>
              {/* <!-- Menu Item AG --> */}

              {/* <!-- Menu Item Votes --> */}
              <li>
                <Link
                  href="/vote"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("vote") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdHowToVote />
                  Votes
                </Link>
              </li>
              {/* <!-- Menu Item Votes --> */}

              {/* <!-- Menu Item Votes --> */}
              <li>
                <Link
                  href="/elections"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("elections") && "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <MdOutlineViewList />
                  Elections
                </Link>
              </li>
              {/* <!-- Menu Item Votes --> */}

            </ul>
          </div>

          {/* Gestion Electronique des Documents */}
          <div>
            <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
              DOCUMENTS
            </h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Documents --> */}
              <li>
                <Link
                  href="/documents"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                    pathname.includes("documents") &&
                    "bg-graydark dark:bg-meta-4"
                  }`}
                >
                  <FaFileShield />
                  Documents
                </Link>
              </li>
              {/* <!-- Menu Item Documents --> */}
            </ul>
          </div>
        </nav>
        {/* <!-- Sidebar Menu --> */}
      </div>
    </aside>
  );
};

export default Sidebar;
