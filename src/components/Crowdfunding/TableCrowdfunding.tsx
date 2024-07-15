import {Crowdfunding} from "@/types/Crowdfunding";
import {
    Button,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownTrigger,
    Input,
    Pagination,
    Selection,
    SortDescriptor,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
} from "@nextui-org/react";
import React from "react";
import HandleCreateCrowdfunding from "./HandleCreateCrowdfunding";
import HandleGiveCrowdfunding from "./HandleGiveCrowdfunding";

const INITIAL_VISIBLE_COLUMNS = ["title", "description", "goalAmount", "actualAmount", "beginDatetime", "endDatetime", "actions"];

const columns = [
  { name: "Identifiant", uid: "id", sortable: true },
  { name: "Titre", uid: "title", sortable: true},
  { name: "Description", uid: "description", sortable: true},
  { name: "Objectif", uid: "goalAmount", sortable: true},
  { name: "Montant actuel", uid: "actualAmount", sortable: true},
  { name: "Date de début", uid: "beginDatetime", sortable: true},
  { name: "Date de fin", uid: "endDatetime", sortable: true},
  { name: "Créateur", uid: "creator", sortable: true},
  { name: "Donateurs", uid: "gives", sortable: true},
  { name: "Actions", uid: "actions", sortable: false}
];

const TableCrowdfunding = ({ crowdfundings, setCrowdfundings }: { crowdfundings: Crowdfunding[]; setCrowdfundings: React.Dispatch<React.SetStateAction<Crowdfunding[]>> }) => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(
    new Set([]),
  );
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid),
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredCrowdfundings = [...crowdfundings];

    if (hasSearchFilter) {
      filteredCrowdfundings = filteredCrowdfundings.filter((crowdfunding) =>
        crowdfunding.title
          .toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase()),
      );
    }

    return filteredCrowdfundings;
  }, [crowdfundings, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Crowdfunding, b: Crowdfunding) => {
      const first = a[sortDescriptor.column as keyof Crowdfunding] as string;
      const second = b[sortDescriptor.column as keyof Crowdfunding] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (crowdfunding: Crowdfunding, columnKey: React.Key) => {
      const cellValue = crowdfunding[columnKey as keyof Crowdfunding];

      switch (columnKey) {
        case "id":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {crowdfunding.id}
              </p>
            </div>
          );
        case "title":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {crowdfunding.title}
              </p>
            </div>
          );
        case "description":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {crowdfunding.description}
              </p>
            </div>
          );
        case "goalAmount":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {crowdfunding.goalAmount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €"}
              </p>
            </div>
          );
        case "actualAmount":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {crowdfunding.actualAmount
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " €"}
              </p>
            </div>
          );
        case "beginDatetime":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {new Date(crowdfunding.beginDatetime).toLocaleDateString()}
              </p>
            </div>
          );
        case "endDatetime":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {new Date(crowdfunding.endDatetime).toLocaleDateString()}
              </p>
            </div>
          );
        case "creator":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {crowdfunding.creator
                  ? crowdfunding.creator.firstName +
                    " " +
                    crowdfunding.creator.lastName
                  : "Créateur anonyme"}
              </p>
            </div>
          );
        case "gives":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {crowdfunding.gives.length} dons
              </p>
            </div>
          );
        case "actions":
          return (
            <HandleGiveCrowdfunding crowdfunding={crowdfunding} />
          )

        default:
          return <>{cellValue}</>;
      }
    },
    [],
  );

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    [],
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex items-end justify-between gap-3">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search..."
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Dropdown className="border border-stroke bg-white dark:border-strokedark dark:bg-boxdark">
              <DropdownTrigger className="hidden sm:flex">
                <Button variant="flat">Colonnes</Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={setVisibleColumns}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.uid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <HandleCreateCrowdfunding crowdfundings={crowdfundings} setCrowdfundings={setCrowdfundings} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            {crowdfundings.length} crowdfunding
          </span>
          <label className="flex items-center text-small text-default-400">
            Lignes par page
            <select
              className="bg-transparent text-small text-default-400 outline-none"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, visibleColumns, crowdfundings.length, onRowsPerPageChange, onClear]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Tous les crowdfunding sélectionnés"
            : `${selectedKeys.size} sur ${filteredItems.length} crowdfunding sélectionnés`}
        </span>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden w-[30%] justify-end gap-2 sm:flex">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Précédent
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Suivant
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    filteredItems.length,
    page,
    pages,
    onPreviousPage,
    onNextPage,
  ]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <Table
        aria-label="Crowdfunding Table"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{
          wrapper: "max-h-[382px] shadow-none p-0",
        }}
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody items={sortedItems} emptyContent={"Aucun crowdfunding trouvé"}>
          {(item: Crowdfunding) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell key={columnKey}>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableCrowdfunding;
