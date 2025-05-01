import axios from "axios";
import usersReducer, { fetchUsers, setSearchTerm, setSort, UserState } from "./usersSlice";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("users slice", () => {
  const initialState: UserState = {
    users: [],
    status: "idle",
    error: null,
    searchTerm: "",
    sortKey: "name",
    sortOrder: "asc",
  };

  it("should handle initial state", () => {
    expect(usersReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle setSearchTerm", () => {
    const actual = usersReducer(initialState, setSearchTerm("test"));
    expect(actual.searchTerm).toEqual("test");
  });

  it("should handle setSort", () => {
    const actual = usersReducer(
      initialState,
      setSort({ key: "username", order: "desc" })
    );
    expect(actual.sortKey).toEqual("username");
    expect(actual.sortOrder).toEqual("desc");
  });

  describe("fetchUsers", () => {
    it("should handle pending", () => {
      const action = { type: fetchUsers.pending.type };
      const state = usersReducer(initialState, action);
      expect(state.status).toEqual("loading");
    });

    it("should handle fulfilled", async () => {
      const mockUsers = [{ id: 1, name: "John Doe" }];
      mockedAxios.get.mockResolvedValue({ data: mockUsers });

      const action = await fetchUsers.fulfilled(mockUsers, "", undefined);
      const state = usersReducer(initialState, action);

      expect(state.status).toEqual("succeeded");
      expect(state.users).toEqual(mockUsers);
    });

    it("should handle rejected", async () => {
      const errorMessage = "Network Error";
      mockedAxios.get.mockRejectedValue(new Error(errorMessage));

      const action = fetchUsers.rejected(new Error(errorMessage), "");
      const state = usersReducer(initialState, action);

      expect(state.status).toEqual("failed");
      expect(state.error).toContain(errorMessage);
    });
  });
});
