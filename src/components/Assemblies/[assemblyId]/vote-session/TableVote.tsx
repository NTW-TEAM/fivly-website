"use client";
import { Vote } from "@/types/Vote";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Selection,
  SortDescriptor,
  Link,
} from "@nextui-org/react";
import React from "react";
import { FaEye } from "react-icons/fa";
import HandleAddVoteToAssembly from "./HandleAddVoteToAssembly";
import HandleDeleteVoteAssembly from "./HandleDeleteVoteAssembly";
import HandleToggleVoteAssembly from "./HandleToggleVoteAssembly";
import SeeVoteResult from "./SeeVoteResult";
const INITIAL_VISIBLE_COLUMNS = ["description", "beginDateTime", "canceled", "actions"];

const columns = [
  { name: "Identifiant", uid: "id", sortable: true },
  { name: "Description", uid: "description", sortable: true },
  { name: "Date de début", uid: "beginDateTime", sortable: true },
  { name: "Durée du vote", uid: "voteTimeInMinutes", sortable: true },
  { name: "Type", uid: "type", sortable: true },
  { name: "Anonyme", uid: "anonymous", sortable: true },
  { name: "Annulé", uid: "canceled", sortable: true },
  { name: "Actions", uid: "actions", sortable: false },
];

const TableVotes = ({
  votes,
  setVotes,
  assemblyId,
}: {
  votes: Vote[];
  setVotes: React.Dispatch<React.SetStateAction<Vote[]>>;
  assemblyId: string;
}) => {
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
    let filteredVotes = [...votes];

    if (hasSearchFilter) {
      filteredVotes = filteredVotes.filter((vote) =>
        vote.description.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredVotes;
  }, [votes, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Vote, b: Vote) => {
      const first = a[sortDescriptor.column as keyof Vote] as string;
      const second = b[sortDescriptor.column as keyof Vote] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((vote: Vote, columnKey: React.Key) => {
    const cellValue = vote[columnKey as keyof Vote];

    switch (columnKey) {
      case "id":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{vote.id}</p>
          </div>
        );
      case "description":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {vote.description}
            </p>
          </div>
        );
      case "beginDateTime":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {new Date(vote.beginDateTime).toLocaleString()}
            </p>
          </div>
        );
      case "voteTimeInMinutes":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {vote.voteTimeInMinutes} minutes
            </p>
          </div>
        );
      case "type":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{vote.type}</p>
          </div>
        );
      case "anonymous":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {vote.anonymous ? "Oui" : "Non"}
            </p>
          </div>
        );
      case "canceled":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">
              {vote.canceled ? "Oui" : "Non"}
            </p>
          </div>
        );

      case "actions":
        return (
          <div className="flex gap-2">
            <SeeVoteResult setVotes={setVotes} voteToSee={vote} assemblyId={assemblyId} />
            <HandleToggleVoteAssembly setVotes={setVotes} voteToToggle={vote} assemblyId={assemblyId} />
            <HandleDeleteVoteAssembly setVotes={setVotes} voteToDelete={vote} assemblyId={assemblyId} />
          </div>
        );

      default:
        return cellValue;
    }
  }, [assemblyId, setVotes]);

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
            <HandleAddVoteToAssembly setVotes={setVotes} assemblyId={assemblyId} />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            {votes.length} sessions de votes
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
  }, [filterValue, onSearchChange, visibleColumns, setVotes, assemblyId, votes.length, onRowsPerPageChange, onClear]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "Toutes les sessions de votes sélectionnées"
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
        aria-label="Votes"
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
        <TableBody
          emptyContent={"Aucune sessions de votes"}
          items={sortedItems}
        >
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

export default TableVotes;
