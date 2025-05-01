import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { UsersList } from "@/component/users-list";
import type { User } from "@/features/users/usersSlice";

const mockUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    email: "john@example.com",
    address: {
      street: "123 Main St",
      suite: "Apt 4",
      city: "Anytown",
      zipcode: "12345",
      geo: { lat: "0", lng: "0" },
    },
    phone: "555-1234",
    website: "john.com",
    company: {
      name: "Company Inc",
      catchPhrase: "Best company",
      bs: "bs",
    },
  },
];

describe("UsersList", () => {
  it("renders loading skeletons", () => {
    render(
      <Provider store={store}>
        <UsersList users={[]} status="loading" />
      </Provider>
    );

    expect(screen.getAllByTestId("skeleton")).toHaveLength(6);
  });

  it("renders user cards when loaded", () => {
    render(
      <Provider store={store}>
        <UsersList users={mockUsers} status="succeeded" />
      </Provider>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("@johndoe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
  });

  it("shows error message when failed", () => {
    render(
      <Provider store={store}>
        <UsersList users={[]} status="failed" />
      </Provider>
    );

    expect(screen.getByText(/failed to load users/i)).toBeInTheDocument();
  });
});
