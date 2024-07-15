"use client";
import {Assembly} from "@/types/Assembly";
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
import React, {ReactNode} from "react";
import HandleCreateAssembly from "./HandleCreateAssembly";
import HandleDeleteAssembly from "./HandleDeleteAssembly";
import HandleEditAssembly from "./HandleEditAssembly";
import {FaEye} from "react-icons/fa";

const INITIAL_VISIBLE_COLUMNS = ["description", "datetime", "isGeneral", "hasStarted", "actions"];

const columns = [
  { name: "Identifiant", uid: "id", sortable: true },
  { name: "Description", uid: "description", sortable: true },
  { name: "Général", uid: "isGeneral", sortable: true },
  { name: "A débuter", uid: "hasStarted", sortable: true },
  { name: "Date", uid: "datetime", sortable: true },
  { name: "Quorum", uid: "quorum", sortable: true },
  { name: "Lieu", uid: "location", sortable: true },
  { name: "Actions", uid: "actions", sortable: false },
];

const TableAssembly = ({ assemblies, setAssemblies }: { assemblies: Assembly[]; setAssemblies: React.Dispatch<React.SetStateAction<Assembly[]>> }) => {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState<Selection>(new Set([]),);
  const [visibleColumns, setVisibleColumns] = React.useState<Selection>(new Set(INITIAL_VISIBLE_COLUMNS),);
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
    let filteredAssemblies = [...assemblies];

    if (hasSearchFilter) {
      filteredAssemblies = filteredAssemblies.filter((assembly) =>
        assembly.description.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredAssemblies;
  }, [assemblies, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Assembly, b: Assembly) => {
      const first = a[sortDescriptor.column as keyof Assembly] as string;
      const second = b[sortDescriptor.column as keyof Assembly] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((assembly: Assembly, columnKey: React.Key) => {
    const cellValue = assembly[columnKey as keyof Assembly];

    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{assembly.id}</p>
          </div>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{assembly.description}</p>
          </div>
        );
      case "isGeneral":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{assembly.isGeneral ? "Yes" : "No"}</p>
          </div>
        );
      case "hasStarted":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{assembly.hasStarted ? "Yes" : "No"}</p>
          </div>
        );
      case "datetime":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{new Date(assembly.datetime).toLocaleDateString()}</p>
          </div>
        );
      case "quorum":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{assembly.quorum}</p>
          </div>
        );
      case "location":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{assembly.location}</p>
          </div>
        );
      case "actions":
        return (
          <div className="flex gap-2">
            <a href={`/assemblies/${assembly.id}`} className="text-gray-900"><FaEye /></a>
            <HandleEditAssembly
              assemblies={assemblies}
              setAssemblies={setAssemblies}
              assemblyToEdit={assembly}
            />
            <HandleDeleteAssembly
              assemblies={assemblies}
              setAssemblies={setAssemblies}
              assemblyToDelete={assembly}
            />
          </div>
        );
        
      default:
        return cellValue as ReactNode;
    }
  }, [assemblies, setAssemblies]);

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
            placeholder="Search by name..."
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
            <HandleCreateAssembly assemblies={assemblies} setAssemblies={setAssemblies} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            {assemblies.length} assemblées
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
  }, [filterValue, onSearchChange, visibleColumns, assemblies, setAssemblies, onRowsPerPageChange, onClear]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Toutes les assemblées sélectionnées"
            : `${selectedKeys.size} sur ${filteredItems.length} assemblées sélectionnés`}
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
      <Table
        aria-label="Assemblées Table"
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
        <TableBody emptyContent={"Aucune assemblées"} items={sortedItems}>
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

export default TableAssembly;
