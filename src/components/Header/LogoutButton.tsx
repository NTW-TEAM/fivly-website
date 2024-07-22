import {RxExit} from "react-icons/rx";


const LogoutButton = () => {

    return (
        <a href="/auth/logout" className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
            <RxExit />
            Déconnexion
        </a>
    );
};

export default LogoutButton;
