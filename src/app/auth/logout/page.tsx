import { Metadata } from "next";
import { DESCRIPTION, TITLE } from "@/constant/metadata";
import LogoutPageComponent from "@/components/StripeComponent/LogoutPageComponent";

export const metadata: Metadata = {
    title: TITLE + " - Logout",
    description: DESCRIPTION,
};

const Logout: React.FC = () => {
    return (
        <LogoutPageComponent />
    );
};

export default Logout;