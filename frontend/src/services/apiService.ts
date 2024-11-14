import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface Supplier {
  id: string;
  name: string;
  vatNumber: string;
}

export const apiService = {
  getSuppliers: async (): Promise<Supplier[]> => {
    const response = await axios.get(`${API_BASE_URL}/data-service/method/suppliers`);
    return response.data;
  },
  getSupplierById: async (id: string): Promise<Supplier> => {
    const response = await axios.get(`${API_BASE_URL}/data-service/method/suppliers/${id}`);
    return response.data;
  },
  createSupplier: async (supplier: Omit<Supplier, "id">): Promise<Supplier> => {
    const response = await axios.post(`${API_BASE_URL}/data-service/method/suppliers`, supplier);
    return response.data;
  },
  updateSupplier: async (id: string, supplier: Partial<Supplier>): Promise<Supplier> => {
    const response = await axios.put(`${API_BASE_URL}/data-service/method/suppliers/${id}`, supplier);
    return response.data;
  },
  deleteSupplier: async (id: string): Promise<void> => {
    await axios.delete(`${API_BASE_URL}/data-service/method/suppliers/${id}`);
  },
};
