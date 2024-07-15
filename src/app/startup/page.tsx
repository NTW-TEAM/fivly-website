import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import StartUpPageComponent from "@/components/StartUp/StartUpPageComponent";

export const metadata: Metadata = {
  title: TITLE + " - StartUp",
  description: DESCRIPTION,
};
const Profile = () => {
  return (
    <StartUpPageComponent />
  );
};

export default Profile;
