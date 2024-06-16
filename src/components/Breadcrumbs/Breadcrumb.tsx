import Link from "next/link";

interface BreadcrumbProps {
  pageName: string | string[];
}

const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  const renderBreadcrumbItems = () => {
    if (Array.isArray(pageName)) {
      return pageName.map((name, index) => (
        <li
          key={index}
          className={`font-medium ${index === pageName.length - 1 ? "text-primary" : ""}`}
        >
          {index !== pageName.length - 1 ? (
            <>
              <Link href={`/${pageName.slice(0, index + 1).join("/")}`}>
                {name}
              </Link>
              <span> / </span>
            </>
          ) : (
            name
          )}
        </li>
      ));
    } else {
      return <li className="font-medium text-primary">{pageName}</li>;
    }
  };

  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <h2 className="text-title-md2 font-semibold text-black dark:text-white">
        {Array.isArray(pageName) ? pageName[pageName.length - 1] : pageName}
      </h2>

      <nav>
        <ol className="flex items-center gap-2">
          <li>
            <Link className="font-medium" href="/">
              Filvly /
            </Link>
          </li>
          {renderBreadcrumbItems()}
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
