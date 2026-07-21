import { useState } from "react";

export const useTableSelection = <T extends { id: string }>(items: T[]) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const isAllSelected = items.length > 0 && selectedIds.size === items.length;
  const isIndeterminate = selectedIds.size > 0 && selectedIds.size < items.length;

  /* helpers functions for selection */
  const isSelected = (id: string) => selectedIds.has(id);
  const selectedItems = items.filter((i) => selectedIds.has(i.id));
  const clearSelection = () => setSelectedIds(new Set());

  /* toggle selection functions for table */
  const toggleAll = (checked: boolean) => {
    setSelectedIds(checked ? new Set(items.map((i) => i.id)) : new Set());
  };

  const toggleRow = (id: string, checked: boolean) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      checked ? next.add(id) : next.delete(id);
      return next;
    });
  };

  return {
    selectedIds,
    selectedItems,
    isAllSelected,
    isIndeterminate,
    isSelected,
    toggleAll,
    toggleRow,
    clearSelection,
  };
};
