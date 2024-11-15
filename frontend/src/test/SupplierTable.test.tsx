import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import SupplierTable from "../pages/dashboard/Components/SuppliersTable";
import "@testing-library/jest-dom";
import { vi } from "vitest";

const mockSuppliers = [
  { id: "1", vatNumber: "12345", name: "Supplier A" },
  { id: "2", vatNumber: "67890", name: "Supplier B" },
];

const mockHandleEditSupplier = vi.fn();
const mockHandleDeleteSupplier = vi.fn();
const mockHandleFetchSuppliers = vi.fn();

describe("SupplierTable Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders table with supplier data", () => {
    render(
      <SupplierTable
        suppliers={mockSuppliers}
        totalCount={2}
        handleEditSupplier={mockHandleEditSupplier}
        handleDeleteSupplier={mockHandleDeleteSupplier}
        handleFetchSuppliers={mockHandleFetchSuppliers}
      />
    );

    expect(screen.getByText("Supplier A")).toBeInTheDocument();
    expect(screen.getByText("Supplier B")).toBeInTheDocument();
  });

  test("calls handleEditSupplier when Edit button is clicked", () => {
    render(
      <SupplierTable
        suppliers={mockSuppliers}
        totalCount={2}
        handleEditSupplier={mockHandleEditSupplier}
        handleDeleteSupplier={mockHandleDeleteSupplier}
        handleFetchSuppliers={mockHandleFetchSuppliers}
      />
    );

    fireEvent.click(screen.getByTestId("edit supplier 1"));
    expect(mockHandleEditSupplier).toHaveBeenCalledWith(mockSuppliers[1]);
  });

  test("shows delete confirmation modal on delete button click", () => {
    render(
      <SupplierTable
        suppliers={mockSuppliers}
        totalCount={2}
        handleEditSupplier={mockHandleEditSupplier}
        handleDeleteSupplier={mockHandleDeleteSupplier}
        handleFetchSuppliers={mockHandleFetchSuppliers}
      />
    );

    fireEvent.click(screen.getByTestId("delete supplier 1"));
    expect(
      screen.getByText("Are you sure you want to delete Supplier B supplier? This action cannot be undone.")
    ).toBeInTheDocument();
  });

  test("calls handleDeleteSupplier when delete is confirmed", async () => {
    render(
      <SupplierTable
        suppliers={mockSuppliers}
        totalCount={2}
        handleEditSupplier={mockHandleEditSupplier}
        handleDeleteSupplier={mockHandleDeleteSupplier}
        handleFetchSuppliers={mockHandleFetchSuppliers}
      />
    );

    fireEvent.click(screen.getByTestId("delete supplier 1"));

    const confirmButton = screen.getByTestId("confirm");
    fireEvent.click(confirmButton);

    await waitFor(() => {
      expect(mockHandleDeleteSupplier).toHaveBeenCalledWith(
        mockSuppliers[1].id
      );
    });
  });

  test("calls handleFetchSuppliers on pagination change", () => {
    render(
      <SupplierTable
        suppliers={mockSuppliers}
        totalCount={10}
        handleEditSupplier={mockHandleEditSupplier}
        handleDeleteSupplier={mockHandleDeleteSupplier}
        handleFetchSuppliers={mockHandleFetchSuppliers}
      />
    );

    fireEvent.click(screen.getByTestId("next"));
    expect(mockHandleFetchSuppliers).toHaveBeenCalledWith(2, 5);

    fireEvent.click(screen.getByTestId("previous"));
    expect(mockHandleFetchSuppliers).toHaveBeenCalledWith(1, 5);
  });

  test("renders empty state when no suppliers are available", () => {
    render(
      <SupplierTable
        suppliers={[]}
        totalCount={0}
        handleEditSupplier={mockHandleEditSupplier}
        handleDeleteSupplier={mockHandleDeleteSupplier}
        handleFetchSuppliers={mockHandleFetchSuppliers}
      />
    );

    expect(screen.getByText(/No suppliers available/i)).toBeInTheDocument();
  });
});
