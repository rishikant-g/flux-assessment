import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { URLS } from "../../common/constants/urls";
import { useGetTask } from "../../common/services/useTask";
import { useTaskData } from "../../provider/taskProvider";
import Loader from "../common/Loader";
import TaskModal from "./TaskModal";
import { useEffect, useState } from "react";
import {
  useDeleteTaskList,
  useUpdateTaskList,
} from "../../common/services/useTaskList";
import { queryClient } from "../../common/services/queryClient";
import LoaderPortal from "../common/LoaderPortal";

const Task: React.FC<TASK> = () => {
  const { state, dispatch } = useTaskData();
  const [selectedTask, setSelectedTask] = useState({} as any);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();
  const [updateId, setUpdateId] = useState<number>();

  const { data, isLoading } = useGetTask(
    URLS.TASK_ITEMS + `/${state?.selectedTaskList?.id}`,
    state?.selectedTaskList?.id,
    { enabled: !!state?.selectedTaskList?.id },
  );

  const { mutate: mutateDelete, isSuccess: isDeleteSuccess } =
    useDeleteTaskList(URLS.SUB_TASK_DELETE + `${deleteId}`);

  const {
    mutate: mutateUpdate,
    isSuccess: isTaskUpdate,
    isPending,
  } = useUpdateTaskList(URLS.SUB_TASK_UPDATE + `${updateId}`);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setIsEdit(false);
    setSelectedTask({});
  };

  const handleEdit = (selectedTask: any) => {
    setSelectedTask(selectedTask);
    setShowModal(true);
    setIsEdit(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    mutateDelete({ task_id: id });
  };

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: number,
  ) => {
    setUpdateId(id);
    const isChecked = event.target.checked;
    if (isChecked) {
      mutateUpdate({ task_id: id, is_completed: true });
    } else {
      mutateUpdate({ task_id: id, is_completed: false });
    }
  };

  useEffect(() => {
    if (isDeleteSuccess || isTaskUpdate) {
      queryClient.invalidateQueries({ queryKey: ["GET_TASK"] });
    }
  }, [isDeleteSuccess, isTaskUpdate]);

  console.log("ispending", isPending);
  return (
    <>
      {/* {(isLoading || isPending) && <LoaderPortal />} */}
      <LoaderPortal />
      {showModal && (
        <TaskModal
          show={showModal}
          onHide={handleClose}
          title={
            isEdit ? "Edit" : `Add task to ${state.selectedTaskList?.title}`
          }
          isEdit={isEdit}
          selectedTask={selectedTask}
        />
      )}

      <div className="task-div">
        {data?.data?.map((task: any) => (
          <Row
            xs={1}
            sm={2}
            md={3}
            lg={4}
            className="g-4 d-flex justify-content-start"
          >
            <Col key={task.id}>
              <Card>
                <Card.Body>
                  <Form>
                    <Form.Check
                      type="checkbox"
                      id="checkbox-1"
                      checked={task.is_completed ? true : false}
                      onChange={(e: any) => handleCheckboxChange(e, task.id)}
                    />
                  </Form>

                  <Card.Text
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_FIELDS",
                        payload: {
                          selectedTask: task,
                        },
                      })
                    }
                  >
                    {task.description}
                  </Card.Text>
                  <p className="p-0" onClick={() => handleEdit(task)}>
                    edit
                  </p>
                  <p className="p-0" onClick={() => handleDelete(task.id)}>
                    Delete
                  </p>
                  <p></p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </div>
      <Button onClick={handleShow}>Add New Task</Button>
    </>
  );
};

export default Task;
