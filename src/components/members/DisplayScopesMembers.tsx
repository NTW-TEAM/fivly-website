import { Members } from "@/types/members";
import { Scopes } from "@/types/scopes";
import { useState } from "react";

const ScopesMembersDisplay = ({ scopesData }: { scopesData: Scopes[] }) => {
  const [scopes, setScopes] = useState(scopesData);

  return (
    <div className="flex items-center gap-1">
      {scopes.map((scope: Scopes, i) =>
        scope.name.toLowerCase() !== "member" ? (
          <div key={scope.name} className="flex items-center gap-1">
            <div className="flex items-center gap-2 rounded bg-purple-700 px-2 py-1 text-sm text-white">
              <span>{scope.description}</span>
            </div>
          </div>
        ) : (
          <div key={scope.name}></div>
        ),
      )}
    </div>
  );
};

export default ScopesMembersDisplay;
