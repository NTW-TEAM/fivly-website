"use client";
import {AssemblyUser} from "@/types/AssemblyUser";
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
import HandleAddUserToAssembly from "./HandleAddUserToAssembly";
import {Assembly} from "@/types/Assembly";
import HandleDeleteUserAssembly from "./HandleDeleteUserAssembly";

const INITIAL_VISIBLE_COLUMNS = ["name", "email", "adresse", "actions"];

const columns = [
  { name: "Identifiant", uid: "id", sortable: true },
  { name: "Nom", uid: "name", sortable: true },
  { name: "Mail", uid: "email", sortable: true },
  { name: "Téléphone", uid: "phoneNumber", sortable: true },
  { name: "Adresse", uid: "adresse", sortable: true },
  { name: "Actions", uid: "actions", sortable: false },
];

const TableMembersAssembly = ({
  assembly,
  setAssembly,
}: {
  assembly: Assembly | null;
  setAssembly: React.Dispatch<React.SetStateAction<Assembly | null>>;
}) => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS));
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsersState = [...(assembly?.participants ?? [])];
  
    if (hasSearchFilter) {
      filteredUsersState = filteredUsersState.filter(
        (user) =>
          user.firstName.toLowerCase().includes(filterValue.toLowerCase()) ||
          user.lastName.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
  
    return filteredUsersState;
  }, [assembly?.participants, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: AssemblyUser, b: AssemblyUser) => {
      const first = a[sortDescriptor.column as keyof AssemblyUser] as number;
      const second = b[sortDescriptor.column as keyof AssemblyUser] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
    (user: AssemblyUser, columnKey: React.Key) => {
      const cellValue = user[columnKey as keyof AssemblyUser];

      switch (columnKey) {
        case "name":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">
                {user.firstName} {user.lastName}{" "}
              </p>
            </div>
          );
        case "email":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-small capitalize">{user.email}</p>
            </div>
          );
        case "phoneNumber":
          return <p className="text-bold text-small">{user.phoneNumber}</p>;
        case "adresse":
          return (
            <div className="flex flex-col">
              <p className="text-bold text-tiny capitalize text-default-400">
                {user.numberAndStreet}, {user.postalCode} {user.city}, {user.country}
              </p>
            </div>
          );
        case "actions":
        return <HandleDeleteUserAssembly assembly={assembly} setAssembly={setAssembly} assemblyUserToDelete={user} />;  

        default:
          return cellValue;
      }
    },
    [assembly, setAssembly]
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
    []
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
            placeholder="Search by name..."
            value={filterValue}
            onClear={onClear}
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
            {assembly && (
              <HandleAddUserToAssembly assemblyId={assembly.id} setAssembly={setAssembly} />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            {assembly?.participants.length} membres
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
  }, [filterValue, onSearchChange, visibleColumns, assembly, setAssembly, onRowsPerPageChange, onClear]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Tous les utilisateurs sélectionnés"
            : `${selectedKeys.size} sur ${filteredItems.length} utilisateurs sélectionnés`}
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
  }, [selectedKeys, filteredItems.length, page, pages, onPreviousPage, onNextPage]);

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pb-2.5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h1 className="mb-4 text-2xl font-bold">Membres de l&apos;assemblée</h1>
      <Table
        aria-label="AssemblyUser Table"
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
        <TableBody emptyContent={"Aucune membres"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.id}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableMembersAssembly;
