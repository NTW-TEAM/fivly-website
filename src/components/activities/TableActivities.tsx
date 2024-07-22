"use client";
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
import {Activity} from "@/types/activity";
import HandleDeleteActivities from "./HandleDeleteActivities";
import HandleCreateActivities from "./HandleCreateActivities";
import HandleAssignMaterialsToActivity from "@/components/activities/HandleAssignMaterialsToActivity";
import HandleShowParticipants from "@/components/activities/HandleShowParticipants";
import HandleShowMaterials from "@/components/activities/HandleShowMaterials";

const INITIAL_VISIBLE_COLUMNS = ["name", "description", "actions"];

const columns = [
  { name: "Id", uid: "id", sortable: true},
  { name: "Nom", uid: "name", sortable: true },
  { name: "Description", uid: "description", sortable: false },
  { name: "Date de début", uid: "dateDebut", sortable: true },
  { name: "Date de fin", uid: "dateFin", sortable: true },
  { name: "Actions", uid: "actions", sortable: false },
];

const TableActivities = ({
                           activities,
                           setActivities,
                         }: {
  activities: Activity[];
  setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
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
    let filteredActivities = [...activities];

    if (hasSearchFilter) {
      filteredActivities = filteredActivities.filter((activityType) =>
          activityType.title.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }

    return filteredActivities;
  }, [activities, hasSearchFilter, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a: Activity, b: Activity) => {
      const first = a[sortDescriptor.column as keyof Activity] as string;
      const second = b[sortDescriptor.column as keyof Activity] as string;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const renderCell = React.useCallback(
      (activity: Activity, columnKey: React.Key) => {
        const cellValue = activity[columnKey as keyof Activity];

        switch (columnKey) {
          case "id":
            return (
                <div className="flex flex-col">
                  <p className="text-small text-default-400">{activity.id}</p>
                </div>
            );
          case "name":
            return (
                <div className="flex flex-col">
                  <p className="text-bold text-small capitalize">
                    {activity.title}
                  </p>
                </div>
            );
          case "description":
            return (
                <div className="flex flex-col">
                  <p className="text-small text-default-400">{activity.description}</p>
                </div>
            );
          case "dateDebut":
            return (
                <div className="flex flex-col">
                  <p className="text-small text-default-400">
                    {new Date(activity.beginDateTime).toLocaleString("fr-FR")}
                  </p>
                </div>
            );
          case "dateFin":
            return (
                <div className="flex flex-col">
                <p className="text-small text-default-400">{new Date(activity.endDateTime).toLocaleString("fr-FR")}</p>
                </div>
            );
          case "actions":
            return (
                <div className="flex gap-2">
                  <HandleAssignMaterialsToActivity
                      activity={activity}
                      setActivities={setActivities}
                  />
                  <HandleShowMaterials materials={activity.materials || []} activityId={activity.id.toString()} setActivities={setActivities} />
                  <HandleShowParticipants participants={activity.participants || []} />
                  <HandleDeleteActivities
                      activities={activities}
                      setActivities={setActivities}
                      activitieDelete={activity}
                  />
                </div>
            );

          default:
            return cellValue as string;
        }
      },
      [activities, setActivities],
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
              <HandleCreateActivities
                  activities={activities}
                  setActivities={setActivities}
              />
            </div>
          </div>
          <div className="flex items-center justify-between">
          <span className="text-small text-default-400">
            {activities.length} activité(s)
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
  }, [filterValue, onSearchChange, visibleColumns, activities, setActivities, onRowsPerPageChange, onClear]);

  const bottomContent = React.useMemo(() => {
    return (
        <div className="flex items-center justify-between px-2 py-2">
        <span className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
              ? "Activité sélectionnés"
              : `${selectedKeys.size} sur ${filteredItems.length} activité(s) sélectionnés`}
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
            aria-label="Activité Table"
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
          <TableBody emptyContent={"Aucune activité"} items={sortedItems}>
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

export default TableActivities;
