import {Metadata} from "next";
import {DESCRIPTION, TITLE} from "@/constant/metadata";
import ProfilePageComponent from "@/components/Profile/ProfilePageComponent";
import {getUser} from "@/tools/GetUser";

export const metadata: Metadata = {
  title: TITLE + " - Profile",
  description: DESCRIPTION,
};
const Profile = () => {
  const user = getUser();
  return (
    <ProfilePageComponent user={user} />
  );
};

export default Profile;
