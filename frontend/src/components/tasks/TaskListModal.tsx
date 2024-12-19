// src/components/TaskListModal.tsx

import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { URLS } from "../../common/constants/urls";
import {
  usePostTaskList,
  useUpdateTaskList,
} from "../../common/services/useTaskList";
import { queryClient } from "../../common/services/queryClient";

// Define the props for the TaskListModal
interface TaskListModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  isEdit?: boolean;
  selectedTaskList?: any;
}

const TaskListModal: React.FC<TaskListModalProps> = ({
  show,
  onHide,
  title,
  isEdit = false,
  selectedTaskList,
}) => {
  const [taksTitle, setTaskTitle] = useState<string>(
    selectedTaskList?.title || "",
  );
  const { mutate, isSuccess } = usePostTaskList(URLS.TASK_CREATE);
  const { mutate: mutateUpdate, isSuccess: isTaskUpdate } = useUpdateTaskList(
    selectedTaskList
      ? URLS.TASK_UPDATE + `${selectedTaskList?.id}`
      : URLS.TASK_UPDATE,
  );

  const handleCreateTask = () => {
    if (isEdit) {
      mutateUpdate({ title: taksTitle });
    } else {
      mutate({ title: taksTitle });
    }
  };

  useEffect(() => {
    if (isSuccess || isTaskUpdate) {
      onHide();
      queryClient.invalidateQueries({ queryKey: ["GET_TASK_LIST"] });
    }
  }, [isSuccess, isTaskUpdate]);

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              onChange={(e) => setTaskTitle(e.target.value)}
              value={taksTitle}
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
          {isEdit ? "Update" : "Save"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TaskListModal;
