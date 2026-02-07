import { useEffect, useMemo, useState } from 'react';

export interface CustomList {
  id: string;
  name: string;
  itemIds: string[];
  createdAt: string;
}

const STORAGE_KEY = 'cl_custom_lists';

const readInitialLists = (): CustomList[] => {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (entry) => typeof entry?.id === 'string' && typeof entry?.name === 'string' && Array.isArray(entry?.itemIds)
    );
  } catch {
    return [];
  }
};

export const useCustomLists = () => {
  const [lists, setLists] = useState<CustomList[]>(readInitialLists);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lists));
    }
  }, [lists]);

  const createList = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return null;
    const newList: CustomList = {
      id: `list-${Date.now()}`,
      name: trimmed,
      itemIds: [],
      createdAt: new Date().toISOString()
    };
    setLists((prev) => [...prev, newList]);
    return newList;
  };

  const addItemToList = (listId: string, itemId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId && !list.itemIds.includes(itemId)
          ? { ...list, itemIds: [...list.itemIds, itemId] }
          : list
      )
    );
  };

  const removeItemFromList = (listId: string, itemId: string) => {
    setLists((prev) =>
      prev.map((list) =>
        list.id === listId ? { ...list, itemIds: list.itemIds.filter((id) => id !== itemId) } : list
      )
    );
  };

  const deleteList = (listId: string) => {
    setLists((prev) => prev.filter((list) => list.id !== listId));
  };

  const sortedLists = useMemo(() => {
    return [...lists].sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }, [lists]);

  return {
    lists: sortedLists,
    createList,
    addItemToList,
    removeItemFromList,
    deleteList
  };
};
