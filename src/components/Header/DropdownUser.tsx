import React, {useEffect, useRef, useState} from "react";
import Link from "next/link";
import {FaUserCircle} from "react-icons/fa";
import LogoutButton from "./LogoutButton";
import {UserJwt} from "@/types/UserJwt";

const DropdownUser = ({
                        user,
                      }: {
  user: UserJwt;
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {user.firstName} {user.lastName}
          </span>
          <span className="block text-xs">{user.email}</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <FaUserCircle width={112} height={112} className="w-full h-full dark:text-primarydark" />
        </span>
      </Link>

      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? "block" : "hidden"
          }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-4.5 dark:border-strokedark">
          <li>
            <Link href="/profile" className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
              <FaUserCircle />
              Mon profil
            </Link>
          </li>
        </ul>
        <LogoutButton />
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
