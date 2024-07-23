import React from "react";
import { Scopes } from "@/types/Scopes";

const DisplayScopesMembers = ({ scopesData }: { scopesData: Scopes[] }) => {
  if (scopesData.length <= 0) return <div>Aucune Permission</div>;

  return (
      <div className="flex items-center gap-1">
        {scopesData.map((scope: Scopes) =>
            scope.name.toLowerCase() !== "member" ? (
                <div key={scope.name} className="flex items-center gap-1">
                  <div className="flex items-center gap-2 rounded bg-purple-700 px-2 py-1 text-sm text-white">
                    <span>{scope.description}</span>
                  </div>
                </div>
            ) : (
                <div key={scope.name}></div>
            )
        )}
      </div>
  );
};

export default DisplayScopesMembers;
