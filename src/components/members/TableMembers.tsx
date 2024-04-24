"use client";
import { deleteRoleToMemberService } from "@/services/memberService";
import { Members } from "@/types/members";
import { Roles } from "@/types/roles";
import { Scopes } from "@/types/scopes";
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
  Chip,
  Pagination,
  Selection,
  SortDescriptor,
  Link,
  Spinner,
} from "@nextui-org/react";
import axios from "axios";
import React from "react";
import { FaEllipsisV, FaTimesCircle} from "react-icons/fa";
const INITIAL_VISIBLE_COLUMNS = ["name", "email", "adresse", "actions", "roles"];

const columns = [
  { name: "Identifiant", uid: "id", sortable: true },
  { name: "Nom", uid: "name", sortable: true },
  { name: "Mail", uid: "email", sortable: true },
  { name: "Téléphone", uid: "phoneNumber", sortable: true },
  { name: "ADRESSE", uid: "adresse", sortable: true },
  { name: "Dernière connexion", uid: "lastConnection", sortable: true },
  { name: "Rôles", uid: "roles", sortable: true },
  { name: "Permissions", uid: "scopes", sortable: true },
  { name: "Actions", uid: "actions", sortable: false },
];

const TableMembers = ({ users }: { users: Members[]}) => {
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
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.firstName.toLowerCase().includes(filterValue.toLowerCase()) || user.lastName.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredUsers;
  }, [users, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Members, b: Members) => {
      const first = a[sortDescriptor.column as keyof Members] as number;
      const second = b[sortDescriptor.column as keyof Members] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback((user: Members, columnKey: React.Key) => {
    const cellValue = user[columnKey as keyof Members];

    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-bold text-small capitalize">{user.firstName} {user.lastName} </p>
            <p className="text-bold text-tiny text-default-400 capitalize">
              Dernière connexion: {" "}
              {Date.parse(user.lastConnection) ? new Date(user.lastConnection).toLocaleDateString() : "N/A"}
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
            <p className="text-bold text-tiny text-default-400 capitalize">
              {user.numberAndStreet}, {user.postalCode} {user.city}, {user.country}
            </p>
          </div>
        );
      case "roles":
        const deleteRoleToMember = (userId: number, roleName: string) => async () => {
          try {
            const res = await axios.delete(`http://localhost:3001/api/users/${userId}/role/${roleName}`);
            console.log("response intern api call", res);
          }
          catch (error) {
            console.error(error);
          }
        }


        return (
          <div className="flex items-center gap-1">
            {user.roles.map((role: Roles, i: number) =>
              role.name.toLowerCase() !== "member" ? (
                <div key={role.name} className="flex items-center gap-1">
                  <div className="flex items-center gap-2 rounded bg-primary px-2 py-1 text-sm text-white">
                    <span>{role.name}</span>

                    <Button onClick={ deleteRoleToMember(user.id, role.name)}
                      size="sm"
                      variant="light"
                    >
                      <FaTimesCircle />
                    </Button>



                  </div>
                </div>
              ) : (
                <div key={role.name}></div>
              ),
            )}
            {/* add button */}
            {/* <Button key={"button"} size="sm" variant="light" onClick={() => console.log("Add role")}><FaPlus /></Button> */}
          </div>
        );
      case "scopes":
        return (
          <div className="flex gap-1">
            {user.scopes.map((scope: Scopes) => (
              <Chip key={scope.name} color="primary" size="sm">
                {scope.name}
              </Chip>
            ))}
          </div>
        );;
      case "actions":
        return (
          <div className="relative flex items-center justify-end gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <FaEllipsisV />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem><Link href={`/members/edit/${user.id}`}>Modifier</Link></DropdownItem>
                <DropdownItem>Actif / Innactif</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
            <Button color="primary">Ajouter un membre</Button>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-default-400 text-small">
            {users.length} membres
          </span>
          <label className="text-default-400 text-small flex items-center">
            Lignes par page
            <select
              className="text-default-400 text-small bg-transparent outline-none"
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
  }, [filterValue, onSearchChange, visibleColumns, users.length, onRowsPerPageChange, onClear]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="flex items-center justify-between px-2 py-2">
        <span className="text-small text-default-400 w-[30%]">
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
      <Table
        aria-label="Members Table"
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

export default TableMembers;
