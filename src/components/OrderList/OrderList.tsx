import { ReactElement } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

const OrderList = ({ data }: any): ReactElement => {
  const columns = [
    { field: "id", headerName: "ID" },
    { field: "orderNumber", headerName: "Order No.", width: 150 },
    { field: "type", headerName: "Type", width: 150 },
    { field: "item", headerName: "Item", width: 150 },
    { field: "category", headerName: "Category", width: 150 },
    { field: "status", headerName: "Status", width: 150 },
    { field: "createdAt", headerName: "Date", width: 150 },
  ];

  return (
    <>
      <DataGrid
        rows={data}
        columns={columns}
        pageSize={25}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
            printOptions: { disableToolbarButton: true },
            csvOptions: { disableToolbarButton: true },
          },
        }}
      />
    </>
  );
};

export default OrderList;
