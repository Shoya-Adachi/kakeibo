import {
  MaterialReactTable,
  MRT_ColumnDef,
  useMaterialReactTable,
} from "material-react-table";


interface TableProps<T extends Record<string, any>> {
  columns: MRT_ColumnDef<T>[];
  data: T[];
  enableRowSelection?: boolean;
  enableColumnOrdering?: boolean;
  enableGlobalFilter?: boolean;
  enableRowActions?: boolean;
  hiddenColumnKeys?: string[];
  renderRowActions?: (row: T) => React.ReactNode;
}

const DataTable = <T extends Record<string, any>>({
  columns,
  data,
  enableRowSelection = true,
  enableColumnOrdering = true,
  enableGlobalFilter = true,
  enableRowActions = false,
  hiddenColumnKeys,
  renderRowActions,
}: TableProps<T>) => {
  const columnVisibility = hiddenColumnKeys?.reduce(
    (acc, key) => {
      acc[key] = false;
      return acc;
    },
    {} as Record<string, boolean>
  );
  const table = useMaterialReactTable({
    columns,
    data,
    enableRowSelection: enableRowSelection,
    enableColumnOrdering: enableColumnOrdering,
    enableGlobalFilter: enableGlobalFilter,
    enableRowActions: enableRowActions,
    initialState: {
      columnVisibility: columnVisibility ?? {},
    },
    renderRowActions: renderRowActions
      ? ({ row }) => renderRowActions(row.original)
      : undefined,
    //チェックボックスの色
    muiSelectCheckboxProps: {
      sx: {
        "&.Mui-checked": {
          color: "secondary.main", // チェック後の色
        },
      },
    },
    //全選択ボタンの色
    muiSelectAllCheckboxProps: {
      sx: {
        "&.Mui-checked": {
          color: "secondary.main", // チェック後の色
        },
      },
    },
    // データが選択された時のツールバーの色
    muiToolbarAlertBannerProps: {
      sx: {
        backgroundColor: "secondary.main",
        color: "white", // テキスト色
      },
    },
  });

  return <MaterialReactTable table={table} />;
};

export default DataTable;
