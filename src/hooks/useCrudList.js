import { useState, useEffect, useCallback, useRef } from "react";
import useDebounce from "./useDebounce";
import { useError } from "../context/ErrorProvider";

export default function useCrudList({
  fetchFunction,
  deleteFunction,
}) {
  const { showError } = useError();

  const [rows, setRows] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 10,
  });

  const [sortModel, setSortModel] = useState([]);
  const [filterModel, setFilterModel] = useState({ items: [] });

  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 500);

  const requestIdRef = useRef(0);

  const fetchData = useCallback(async () => {
    const currentRequestId = ++requestIdRef.current;
    setLoading(true);

    try {
      const { page, pageSize } = paginationModel;
      const sortField = sortModel[0]?.field ?? null;
      const sortDirection = sortModel[0]?.sort ?? null;

      const response = await fetchFunction({
        start: page * pageSize,
        limit: pageSize,
        sortField,
        sortDirection,
        search: debouncedSearch,
        filters: filterModel.items,
      });

      if (currentRequestId !== requestIdRef.current) return;

      setRows(response?.data ?? []);
      setRowCount(response?.total ?? 0);
    } catch (error) {
      showError(error?.message || "Failed to fetch data");
    } finally {
      if (currentRequestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, [
    paginationModel.page,
    paginationModel.pageSize,
    sortModel,
    filterModel,
    debouncedSearch,
    fetchFunction,
    showError,
  ]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await deleteFunction(id);
      fetchData();
    } catch (error) {
      showError(error?.message || "Delete failed");
      setLoading(false);
    }
  };

  return {
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

    handleDelete,
    refresh: fetchData,
  };
}