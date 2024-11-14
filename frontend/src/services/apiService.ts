import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Supplier {
  id: string;
  name: string;
  vatNumber: string;
}

export const apiService = {
  getSuppliers: async (): Promise<Supplier[]> => {
    const response = await axios.get(
    `${API_BASE_URL}/suppliers`,
      {
        headers: {
          "Content-Type": "application/json",
        },

      }
    );
    return response.data;
  },
  getSupplierById: async (id: string): Promise<Supplier> => {
    const response = await axios.get(
      `${API_BASE_URL}/suppliers/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },
  createSupplier: async (supplier: Omit<Supplier, "id">): Promise<Supplier> => {
    const response = await axios.post(
      `${API_BASE_URL}/suppliers`,
      supplier,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },
  updateSupplier: async (
    id: string,
    supplier: Partial<Supplier>
  ): Promise<Supplier> => {
    const response = await axios.put(
      `${API_BASE_URL}/suppliers/${id}`,
      supplier,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  },
  deleteSupplier: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/suppliers/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  },
};
