import { deleteCookie, getCookie, getCookies } from "cookies-next";
import Link from "next/link";
import { RxExit } from "react-icons/rx";
import { toast } from "react-toastify";


const LogoutButton = () => {

    const isLoggedIn = getCookie("auth_token") ? true : false;

    const handleLogout = () => {
        deleteCookie("auth_token");
        toast.success("Déconnexion réussie");
    };

    return isLoggedIn ? (
        <Link href="/auth/logout" onClick={handleLogout} className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
            <RxExit />
            Déconnexion
        </Link>
    ) : null;
};

export default LogoutButton;
