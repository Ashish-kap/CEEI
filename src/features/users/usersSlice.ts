import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface UserState {
  users: User[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  searchTerm: string;
  sortKey: "name" | "username";
  sortOrder: "asc" | "desc";
}

 const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
  searchTerm: "",
  sortKey: "name",
  sortOrder: "asc",
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users"
  );
  return response.data;
});

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSearchTerm(state, action) {
      state.searchTerm = action.payload.toLowerCase();
    },
    setSort(state, action) {
      state.sortKey = action.payload.key;
      state.sortOrder = action.payload.order;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});

export const { setSearchTerm, setSort } = usersSlice.actions;

export default usersSlice.reducer;

export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
};
