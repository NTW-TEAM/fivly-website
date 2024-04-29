import { Members } from "@/types/members";
import { useState } from "react";

const ScopesMembersDisplay = ({ user }: { user: Members }) => {
  const [scopes, setScopes] = useState(user.scopes);

  return (
    <div className="flex items-center gap-1">
      {scopes.map((scope, i) =>
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
