import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import ProfilePageComponent from "@/components/Profile/ProfilePageComponent";

export const metadata: Metadata = {
  title: TITLE + " - Profile",
  description: DESCRIPTION,
};
const Profile = () => {
  return (
    <ProfilePageComponent />
  );
};

export default Profile;
