"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FaBuilding, FaChartPie, FaRegCalendarAlt, FaShieldAlt, FaUsers } from "react-icons/fa";
import { GiReceiveMoney } from "react-icons/gi";
import { SiCrowdsource, SiGooglemeet } from "react-icons/si";
import { FaFileShield } from "react-icons/fa6";
import { MdOutlineChairAlt, MdOutlineTypeSpecimen } from "react-icons/md";
import { UserJwt } from "@/types/UserJwt";
import { Scopes } from "@/types/Scopes";

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
  user: UserJwt;
}

const Sidebar = ({ sidebarOpen, setSidebarOpen, user }: SidebarProps) => {
  const pathname = usePathname();

  const trigger = useRef<any>(null);
  const sidebar = useRef<any>(null);

  let storedSidebarExpanded = "true";

  const [sidebarExpanded, setSidebarExpanded] = useState(
      storedSidebarExpanded === null ? false : storedSidebarExpanded === "true",
  );

  const [combinedScopes, setCombinedScopes] = useState<Scopes[]>([]);

  const checkUserScope = (scopes: Scopes[], requiredScope: string) => {
    return (
        scopes.some(scope => scope.name === requiredScope) ||
        scopes.some(scope => scope.name === 'super:admin')
    );
  };

  useEffect(() => {
    const fetchRolesAndCombineScopes = async () => {
      try {
        const response = await fetch('/api/roles');
        const roles = await response.json();
        const userRoles = user.roles;
        let allScopes = [...user.scopes];

        userRoles.forEach(userRole => {
          const role = roles.find((role: any) => role.name === userRole.name);
          if (role) {
            allScopes = [...allScopes, ...role.scopes];
          }
        });

        setCombinedScopes(allScopes);
        console.log('Combined scopes:', allScopes);
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRolesAndCombineScopes();
  }, [user.roles, user.scopes]);

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

  const isSectionVisible = (sectionScopes: string[]) => {
    return sectionScopes.some(scope => checkUserScope(combinedScopes, scope));
  };

  const globalGroupScopes = [
    'super:admin', 'activities:manage', 'members:manage', 'locals:manage', 'materials:manage', 'roles:manage'
  ];

  const financeGroupScopes = [
    'finances:manage', 'donation:manage', 'crowdfunding:manage'
  ];

  const assemblyGroupScopes = [
    'assemblies:manage'
  ];

  const documentGroupScopes = [
    'documents:manage'
  ];

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
            {isSectionVisible(globalGroupScopes) && (
                <div>
                  <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                    GESTION GLOBALE
                  </h3>

                  <ul className="mb-6 flex flex-col gap-1.5">
                    {checkUserScope(combinedScopes, 'super:admin') && (
                        <li>
                          <Link
                              href="/activityType"
                              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                  pathname.includes("activityType") && "bg-graydark dark:bg-meta-4"
                              }`}
                          >
                            <MdOutlineTypeSpecimen />
                            Type Activités
                          </Link>
                        </li>
                    )}
                    {checkUserScope(combinedScopes, 'activities:manage') && (
                        <li>
                          <Link
                              href="/activities"
                              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                  pathname.includes("activities") && "bg-graydark dark:bg-meta-4"
                              }`}
                          >
                            <FaRegCalendarAlt />
                            Activités
                          </Link>
                        </li>
                    )}
                    {checkUserScope(combinedScopes, 'members:manage') && (
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
                    )}
                    {checkUserScope(combinedScopes, 'locals:manage') && (
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
                    )}
                    {checkUserScope(combinedScopes, 'materials:manage') && (
                        <li>
                          <Link
                              href="/materials/model"
                              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                  pathname.endsWith("materials/model") && "bg-graydark dark:bg-meta-4"
                              }`}
                          >
                            <MdOutlineTypeSpecimen />
                            Model de Matériels
                          </Link>
                        </li>
                    )}
                    {checkUserScope(combinedScopes, 'materials:manage') && (
                        <li>
                          <Link
                              href="/materials"
                              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                  pathname.endsWith("materials") && "bg-graydark dark:bg-meta-4"
                              }`}
                          >
                            <MdOutlineChairAlt />
                            Matériels
                          </Link>
                        </li>
                    )}
                    {checkUserScope(combinedScopes, 'roles:manage') && (
                        <li>
                          <Link
                              href="/permissions"
                              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                  pathname.includes("permissions") && "bg-graydark dark:bg-meta-4"
                              }`}
                          >
                            <FaShieldAlt />
                            Permissions
                          </Link>
                        </li>
                    )}
                  </ul>
                </div>
            )}

            {/* <!-- Finance Group --> */}
            {isSectionVisible(financeGroupScopes) && (
                <div>
                  <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                    FINANCES
                  </h3>

                  <ul className="mb-6 flex flex-col gap-1.5">
                    {checkUserScope(combinedScopes, 'finances:manage') && (
                        <li>
                          <Link
                              href="/finances"
                              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                  pathname.includes("finances") && "bg-graydark dark:bg-meta-4"
                              }`}
                          >
                            <FaChartPie />
                            Dashboard Général
                          </Link>
                        </li>
                    )}
                    {checkUserScope(combinedScopes, 'donation:manage') && (
                        <li>
                          <Link
                              href="/donation"
                              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                  pathname.includes("donation") && "bg-graydark dark:bg-meta-4"
                              }`}
                          >
                            <GiReceiveMoney />
                            Gestion des dons
                          </Link>
                        </li>
                    )}
                    {checkUserScope(combinedScopes, 'crowdfunding:manage') && (
                        <li>
                          <Link
                              href="/crowdfunding"
                              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                  pathname.includes("crowdfunding") && "bg-graydark dark:bg-meta-4"
                              }`}
                          >
                            <SiCrowdsource />
                            Crowdfunding
                          </Link>
                        </li>
                    )}
                  </ul>
                </div>
            )}

            {/* <!-- Assemblées Général Group --> */}
            {isSectionVisible(assemblyGroupScopes) && (
                <div>
                  <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                    ASSEMBLÉES GÉNÉRALES
                  </h3>

                  <ul className="mb-6 flex flex-col gap-1.5">
                    {checkUserScope(combinedScopes, 'assemblies:manage') && (
                        <li>
                          <Link
                              href="/assemblies"
                              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                  pathname.includes("assemblies") && "bg-graydark dark:bg-meta-4"
                              }`}
                          >
                            <SiGooglemeet />
                            Assemblées Générales
                          </Link>
                        </li>
                    )}
                  </ul>
                </div>
            )}

            {/* Gestion Electronique des Documents */}
            {isSectionVisible(documentGroupScopes) && (
                <div>
                  <h3 className="mb-4 ml-4 text-sm font-semibold text-bodydark2">
                    DOCUMENTS
                  </h3>

                  <ul className="mb-6 flex flex-col gap-1.5">
                    {checkUserScope(combinedScopes, 'documents:manage') && (
                        <li>
                          <Link
                              href="/documents"
                              className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${
                                  pathname.includes("documents") && "bg-graydark dark:bg-meta-4"
                              }`}
                          >
                            <FaFileShield />
                            Documents
                          </Link>
                        </li>
                    )}
                  </ul>
                </div>
            )}
          </nav>
          {/* <!-- Sidebar Menu --> */}
        </div>
      </aside>
  );
};

export default Sidebar;
