import React, { useState, useEffect, useCallback, Fragment } from "react";

import { apiService, Supplier } from "../../services/apiService";

import classes from "./Dashboard.module.css";
import SupplierFormModal from "./Components/SupplierFormModal";
import SuppliersTable from "./Components/SuppliersTable";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import Loader from "../loader/Loader";

const Dashboard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [totalCount, setTotalCount] = useState(0);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );

  const handleAddSupplier = useCallback(() => {
    setSelectedSupplier(null);
    setShowModal(true);
  }, []);

  const handleEditSupplier = useCallback((supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setShowModal(true);
  }, []);

  const handleFormSubmit = useCallback(
    (supplier: Supplier, state: "add" | "update") => {
      try {
        if (state == "add") {
          apiService.createSupplier(supplier).then((data) => {
            setSuppliers((prev) => [...prev, data]);
          });
        } else if (state == "update") {
          apiService.updateSupplier(supplier.id, supplier).then((data) => {
            setSuppliers((prev) =>
              prev.map((prevSupplier) =>
                prevSupplier.id === supplier.id ? data : prevSupplier
              )
            );
          });
        }
      } catch (error) {
        console.error(`Error while perfoming supplier ${state}`, error);
      } finally {
        setShowModal(false);
      }
    },
    []
  );

  const handleFetchSuppliers = useCallback((page?: number, limit?: number) => {
    apiService
      .getSuppliers(page, limit)
      .then((data) => {
        setSuppliers(data.data);
        setTotalCount(data.totalCount);
      })
      .catch((error) => {
        console.error("Error fetching suppliers:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    handleFetchSuppliers();
  }, [handleFetchSuppliers]);

  const handleDeleteSupplier = useCallback((supplierId: string) => {
    apiService
      .deleteSupplier(supplierId)
      .then(() =>
        setSuppliers((prev) =>
          prev.filter((supplier) => supplier.id !== supplierId)
        )
      )
      .catch((error) => {
        console.error("Error deleting supplier:", error);
      });
  }, []);

  return (
    <div className={classes.dashboard}>
      {isLoading ? (
        <Loader />
      ) : (
        <Fragment>
          <Link to="/" className={classes.backButton}>
            <FaArrowLeft /> Back to Home
          </Link>
          <div className={classes.dashboardHeader}>
            <h1 className={classes.dashboardTitle}>Suppliers</h1>
            <p className={classes.dashboardSubtitle}>
              Manage your suppliers, collaborate effectively, and track their
              details.
            </p>
            <button
              className={classes.addButton}
              onClick={() => handleAddSupplier()}
            >
              + Add New Supplier
            </button>
          </div>

          <SuppliersTable
            suppliers={suppliers}
            totalCount={totalCount}
            handleFetchSuppliers={handleFetchSuppliers}
            handleEditSupplier={handleEditSupplier}
            handleDeleteSupplier={handleDeleteSupplier}
          />

          <SupplierFormModal
            show={showModal}
            selectedSupplier={selectedSupplier}
            onHide={() => {
              setShowModal(false);
              setSelectedSupplier(null);
            }}
            onSubmit={handleFormSubmit}
          />
        </Fragment>
      )}
    </div>
  );
};

export default Dashboard;
