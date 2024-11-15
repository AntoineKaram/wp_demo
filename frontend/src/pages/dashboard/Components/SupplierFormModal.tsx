import React, { useCallback, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { Supplier } from "../../../services/apiService";
import { toTitleCase } from "../../../helper";
import classes from "./SupplierFormModal.module.css";

interface Props {
  show: boolean;
  selectedSupplier: Supplier | null;
  onHide: () => void;
  onSubmit: (supplier: Supplier, state: "add" | "update") => void;
}

const SupplierFormModal: React.FC<Props> = ({
  show,
  onHide,
  onSubmit,
  selectedSupplier,
}) => {
  const state = selectedSupplier ? "update" : "add";

  const [supplier, setSupplier] = useState<Supplier>({
    id: "",
    name: "",
    vatNumber: "",
  });

  const [errors, setErrors] = useState<{ name?: string; vatNumber?: string }>(
    {}
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setSupplier((prev) => ({ ...prev, [name]: value }));

      if (name === "name") {
        setErrors((prev) => ({
          ...prev,
          name: value.trim() === "" ? "Name is required." : undefined,
        }));
      }
      if (name === "vatNumber") {
        if (value.trim() === "") {
          setErrors((prev) => ({
            ...prev,
            vatNumber: "VAT Number is required.",
          }));
        } else if (!/^\d+$/.test(value)) {
          setErrors((prev) => ({
            ...prev,
            vatNumber: "VAT Number must be numeric.",
          }));
        } else if (value.length > 8) {
          setErrors((prev) => ({
            ...prev,
            vatNumber: "VAT Number must not exceed 8 digits.",
          }));
        } else {
          setErrors((prev) => ({ ...prev, vatNumber: undefined }));
        }
      }
    },
    []
  );

  useEffect(() => {
    if (state === "update" && selectedSupplier) {
      setSupplier({
        id: selectedSupplier.id,
        name: selectedSupplier.name,
        vatNumber: selectedSupplier.vatNumber,
      });
    } else if (state == "add") {
      setSupplier({
        id: "",
        name: "",
        vatNumber: "",
      });
    }
  }, [selectedSupplier, state]);

  const handleSubmit = () => {
    if (
      !errors.name &&
      !errors.vatNumber &&
      supplier.name &&
      supplier.vatNumber
    ) {
      onSubmit(supplier, state);
    }
  };
  const handleOnHide = useCallback(() => {
    onHide();
    setErrors({});
  }, [onHide]);
  
  const isFormValid =
    !errors.name && !errors.vatNumber && supplier.name && supplier.vatNumber;

  return (
    <Modal show={show} onHide={handleOnHide} centered>
      <Modal.Header closeButton className={classes.modalHeader}>
        <Modal.Title className={classes.modalTitle}>{`${toTitleCase(
          state
        )} Supplier`}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.modalBody}>
        <Form>
          <Form.Group controlId="formSupplierName" className="mb-3">
            <Form.Label className={classes.formLabel}>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={supplier.name}
              onChange={handleInputChange}
              placeholder="Enter supplier name"
              className={classes.formControl}
              isInvalid={!!errors.name}
              required
            />
            {errors.name && (
              <Form.Text className={classes.errorText}>{errors.name}</Form.Text>
            )}
          </Form.Group>
          <Form.Group controlId="formSupplierVatNumber" className="mb-3">
            <Form.Label className={classes.formLabel}>VAT Number</Form.Label>
            <Form.Control
              type="text"
              name="vatNumber"
              value={supplier.vatNumber}
              onChange={handleInputChange}
              maxLength={8}
              placeholder="Enter VAT number"
              className={classes.formControl}
              isInvalid={!!errors.vatNumber}
              required
            />
            {errors.vatNumber && (
              <Form.Text className={classes.errorText}>
                {errors.vatNumber}
              </Form.Text>
            )}
          </Form.Group>
          <div className={classes.buttonContainer}>
            <Button
              variant="primary"
              type="button"
              onClick={handleSubmit}
              disabled={!isFormValid}
              className={classes.saveButton}
            >
              Save
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SupplierFormModal;
