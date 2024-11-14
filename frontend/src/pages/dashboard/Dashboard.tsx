import React, { useState, useEffect } from "react";
import { Button, Table, Container, Modal, Form } from "react-bootstrap";

import { apiService, Supplier } from "../../services/apiService";

import classes from "./Dashboard.module.css";

const Dashboard: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );
  const [newSupplier, setNewSupplier] = useState({ name: "", vatNumber: "" });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const data = await apiService.getSuppliers();
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleAddSupplier = () => {
    setSelectedSupplier(null);
    setNewSupplier({ name: "", vatNumber: "" });
    setShowModal(true);
  };

  const handleEditSupplier = (supplier: Supplier) => {
    setSelectedSupplier(supplier);
    setNewSupplier({ name: supplier.name, vatNumber: supplier.vatNumber });
    setShowModal(true);
  };

  const handleDeleteSupplier = async (supplierId: string) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      try {
        await apiService.deleteSupplier(supplierId);
        setSuppliers((prev) =>
          prev.filter((supplier) => supplier.id !== supplierId)
        );
      } catch (error) {
        console.error("Error deleting supplier:", error);
      }
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedSupplier) {
        const updatedSupplier = await apiService.updateSupplier(
          selectedSupplier.id,
          newSupplier
        );
        setSuppliers((prev) =>
          prev.map((supplier) =>
            supplier.id === selectedSupplier.id ? updatedSupplier : supplier
          )
        );
      } else {
        const addedSupplier = await apiService.createSupplier(newSupplier);
        setSuppliers((prev) => [...prev, addedSupplier]);
      }
      setShowModal(false);
    } catch (error) {
      console.error("Error saving supplier:", error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewSupplier((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container className={`py-4 ${classes.dashboard}`}>
      <h1 className={`text-center mb-4${classes.dashboardTitle}`}>Suppliers</h1>
      <div className="text-end mb-3">
        <Button className={classes.addButton} onClick={handleAddSupplier}>
          Add New Supplier
        </Button>
      </div>
      <div className={classes.tableContainer}>
        <Table striped bordered hover responsive className={classes.table}>
          <thead>
            <tr>
              <th>VAT Number</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {suppliers.map((supplier) => (
              <tr key={supplier.id}>
                <td>{supplier.vatNumber}</td>
                <td>{supplier.name}</td>
                <td>
                  <Button
                    className="edit me-2"
                    onClick={() => handleEditSupplier(supplier)}
                  >
                    Edit
                  </Button>
                  <Button
                    className="delete"
                    onClick={() => handleDeleteSupplier(supplier.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedSupplier ? "Edit Supplier" : "Add Supplier"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            <Form.Group controlId="formSupplierName" className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={newSupplier.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="formSupplierVatNumber" className="mb-3">
              <Form.Label>VAT Number</Form.Label>
              <Form.Control
                type="text"
                name="vatNumber"
                value={newSupplier.vatNumber}
                onChange={handleInputChange}
                maxLength={8}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default Dashboard;
