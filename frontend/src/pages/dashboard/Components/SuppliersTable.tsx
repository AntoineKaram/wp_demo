import React, { useCallback, useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { FaPen, FaTrash } from "react-icons/fa6";

import { Supplier } from "../../../services/apiService";

import Tooltip from "../../../components/tooltip/Tooltip";
import DeleteConfirmationModal from "./DeleteSupplierModal";

import classes from "./SuppliersTable.module.css";

interface Props {
  totalCount: number;
  suppliers: Supplier[];
  handleEditSupplier: (supplier: Supplier) => void;
  handleDeleteSupplier: (supplierId: string) => void;
  handleFetchSuppliers: (page: number, limit: number) => void;
}

const SupplierTable: React.FC<Props> = ({
  suppliers,
  totalCount,
  handleEditSupplier,
  handleDeleteSupplier,
  handleFetchSuppliers,
}) => {
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [supplierToDelete, setSupplierToDelete] = useState<Supplier | null>(
    null
  );

  const handleNextPage = () => {
    const totalPages = Math.ceil(totalCount / limit);
    if (page < totalPages) setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (page > 1) setPage((prevPage) => prevPage - 1);
  };

  useEffect(() => {
    handleFetchSuppliers(page, limit);
  }, [handleFetchSuppliers, limit, page]);

  const confirmDeleteSupplier = useCallback((supplier: Supplier) => {
    setSupplierToDelete(supplier);
    setShowDeleteModal(true);
  }, []);

  const handleConfirmDelete = useCallback((supplierId: string) => {
    if (supplierId) {
      handleDeleteSupplier(supplierId);
    }
    setShowDeleteModal(false);
    setSupplierToDelete(null);
  }, []);

  return (
    <div className={classes.suppliersTableContainer}>
      <Table hover responsive className={classes.suppliersTable}>
        <thead className={classes.tableHeader}>
          <tr>
            <th className={classes.tableHeaderCell}>VAT Number</th>
            <th className={classes.tableHeaderCell}>Name</th>
            <th className={classes.tableHeaderCell}>Actions</th>
          </tr>
        </thead>
        <tbody className={classes.tableBody}>
          {suppliers.map((supplier, index) => (
            <tr className={classes.tableBodyRow} key={supplier.id}>
              <td className={classes.tableCell}>{supplier.vatNumber}</td>
              <td className={classes.tableCell}>{supplier.name}</td>
              <td className={`${classes.tableCell} ${classes.actionCell}`}>
                <Tooltip text="Edit Supplier">
                  <button
                    className={`${classes.actionButton} ${classes.editButton}`}
                    onClick={() => handleEditSupplier(supplier)}
                    data-testid={`edit supplier ${index}`}
                  >
                    <FaPen />
                  </button>
                </Tooltip>
                <Tooltip text="Delete Supplier">
                  <button
                    className={`${classes.actionButton} ${classes.deleteButton}`}
                    onClick={() => confirmDeleteSupplier(supplier)}
                    data-testid={`delete supplier ${index}`}
                  >
                    <FaTrash />
                  </button>
                </Tooltip>
              </td>
            </tr>
          ))}
          {suppliers.length === 0 && (
            <tr>
              <td colSpan={3} className={classes.emptyState}>
                No suppliers available. Click "Add New Supplier" to get started!
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <div className={classes.paginationControls}>
        <Button
          variant="outline-primary"
          disabled={page === 1}
          onClick={handlePreviousPage}
          data-testid="previous"
        >
          Previous
        </Button>
        <span>
          Page {page} of {Math.ceil(totalCount / limit)}
        </span>
        <Button
          variant="outline-primary"
          disabled={page === Math.ceil(totalCount / limit)}
          onClick={handleNextPage}
          data-testid="next"
        >
          Next
        </Button>
      </div>
      <DeleteConfirmationModal
        show={showDeleteModal}
        supplierToDelete={supplierToDelete!}
        onHide={() => setShowDeleteModal(false)}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default SupplierTable;
