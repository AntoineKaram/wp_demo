import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Supplier } from "../../../services/apiService";

interface DeleteConfirmationModalProps {
  show: boolean;
  supplierToDelete: Supplier;
  onHide: () => void;
  onConfirm: (id: string) => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  show,
  supplierToDelete,
  onHide,
  onConfirm,
}) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {supplierToDelete?.name} supplier? This
        action cannot be undone.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={() => onConfirm(supplierToDelete.id)}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
