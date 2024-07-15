// components/BreadcrumbDemo.tsx
import React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface BreadcrumbDemoProps {
  currentPath: string;
  onFolderSelect: (path: string) => void;
}

const BreadcrumbDemo: React.FC<BreadcrumbDemoProps> = ({ currentPath, onFolderSelect }) => {
  const pathSegments = currentPath.split("/").filter(Boolean);
  const paths = pathSegments.map((_, index) => "/" + pathSegments.slice(0, index + 1).join("/"));

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#" onClick={() => onFolderSelect("/")}>
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>
        {paths.map((path, index) => (
          <React.Fragment key={path}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#" onClick={() => onFolderSelect(path)}>
                {pathSegments[index]}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </React.Fragment>
        ))}
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1">
              <BreadcrumbEllipsis className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {pathSegments.map((segment, index) => (
                <DropdownMenuItem key={index} onClick={() => onFolderSelect(paths[index])}>
                  {segment}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default BreadcrumbDemo;
