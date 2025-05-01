import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import {
  fetchUsers,
  setSearchTerm,
  setSort,
} from "@/features/users/usersSlice";
import { SearchBar } from "@/component/searchBar";
import { SortDropdown } from "@/component/sortDropdown";
import { UsersList } from "@/component/users-list";

export default function HomePage() {
  const dispatch = useAppDispatch();
  const { users, status, searchTerm, sortKey, sortOrder } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const filteredUsers = users
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm) ||
        user.email.toLowerCase().includes(searchTerm)
    )
    .sort((a, b) => {
      const modifier = sortOrder === "asc" ? 1 : -1;
      return a[sortKey].localeCompare(b[sortKey]) * modifier;
    });

  return (
    <main className="container mx-auto p-[50px]">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-30 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">
          Users List
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar
          value={searchTerm}
          onChange={(value) => dispatch(setSearchTerm(value))}
        />
        <SortDropdown
          sortKey={sortKey}
          sortOrder={sortOrder}
          onSortChange={(key, order) => dispatch(setSort({ key, order }))}
        />
      </div>

      <UsersList users={filteredUsers} status={status} />
    </main>
  );
}
