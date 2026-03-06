import React, { useState, useMemo, useCallback } from "react";
import {
  Box,
  Paper,
  Stack,
  Typography,
  Button,
  IconButton,
  Tooltip,
  TextField,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import DeleteConfirmDialog from "./DeleteConfirmDialog";

export default function CrudList({
  title,
  columns,
  rows,
  rowCount,
  loading,

  paginationModel,
  setPaginationModel,

  sortModel,
  setSortModel,

  filterModel,
  setFilterModel,

  searchText,
  setSearchText,

  onAdd,
  onEdit,
  onDelete,
}) {
  const [deleteId, setDeleteId] = useState(null);

  // Reset page when filters change
  const handleFilterChange = useCallback(
    (model) => {
      setPaginationModel((prev) => ({ ...prev, page: 0 }));
      setFilterModel(model);
    },
    [setFilterModel, setPaginationModel]
  );

  // Reset page when search changes
  const handleSearchChange = (e) => {
    setPaginationModel((prev) => ({ ...prev, page: 0 }));
    setSearchText(e.target.value);
  };

  const actionColumn = useMemo(
    () => ({
      field: "actions",
      headerName: "Actions",
      width: 150,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const { canEdit, canDelete } = params.row;

        return (
          <Stack direction="row" spacing={1}>
            {canEdit && (
              <Tooltip title="Edit">
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => onEdit(params.row)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}

            {canDelete && (
              <Tooltip title="Delete">
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => setDeleteId(params.row.id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
          </Stack>
        );
      },
    }),
    [onEdit]
  );

  const finalColumns = useMemo(
    () => [...columns, actionColumn],
    [columns, actionColumn]
  );

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h5">{title}</Typography>
        <Button variant="contained" onClick={onAdd}>
          + Add
        </Button>
      </Stack>

      {/* Search */}
      <Stack mb={2}>
        <TextField
          size="small"
          label="Search"
          value={searchText}
          onChange={handleSearchChange}
        />
      </Stack>

      {/* Grid */}
      <Paper sx={{ p: 2 }}>
        <DataGrid
          autoHeight
          rows={rows}
          columns={finalColumns}
          rowCount={rowCount}
          loading={loading}
          paginationMode="server"
          sortingMode="server"
          filterMode="server"
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          sortModel={sortModel}
          onSortModelChange={setSortModel}
          filterModel={filterModel}
          onFilterModelChange={handleFilterChange}
          pageSizeOptions={[5, 10, 20]}
          disableRowSelectionOnClick
        />
      </Paper>

      <DeleteConfirmDialog
        open={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          onDelete(deleteId);
          setDeleteId(null);
        }}
      />
    </Box>
  );
}