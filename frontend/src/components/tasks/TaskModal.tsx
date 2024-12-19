// src/components/ModalComponent.tsx

import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { usePostTask } from "../../common/services/useTask";
import { URLS } from "../../common/constants/urls";

// Define the props for the ModalComponent
interface ModalComponentProps {
  show: boolean;
  onHide: () => void;
  title: string;
}

const ModalComponent: React.FC<ModalComponentProps> = ({
  show,
  onHide,
  title,
}) => {
  const [taksTitle, setTaskTitle] = useState<string>("");
  const { mutate, isSuccess } = usePostTask(URLS.TASK_CREATE);

  const handleCreateTask = () => {
    mutate({ title: taksTitle });
  };

  useEffect(() => {
    if (isSuccess) onHide();
  }, [isSuccess]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Enter task list name</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => setTaskTitle(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={handleCreateTask}
          disabled={!taksTitle}
        >
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
