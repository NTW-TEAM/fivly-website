import { Roles } from "@/types/Roles";
import { useState } from "react";

const RoleMembersDisplay = ({ rolesData }: { rolesData: Roles[] }) => {

  return (
    <div className="flex items-center gap-1">
      {rolesData.map((role, i) =>
        role.name.toLowerCase() !== "member" ? (
          <div key={role.name} className="flex items-center gap-1">
            <div className="flex items-center gap-2 rounded bg-primary px-2 py-1 text-sm text-white">
              <span>{role.name}</span>
            </div>
          </div>
        ) : (
          <div key={role.name}></div>
        ),
      )}
    </div>
  );
};

export default RoleMembersDisplay;
