import { Button, Card, Col, Row } from "react-bootstrap";
import {
  useDeleteTaskList,
  useGetTaskList,
} from "../../common/services/useTaskList";
import { URLS } from "../../common/constants/urls";
import { useTaskData } from "../../provider/taskProvider";
import Loader from "../common/Loader";
import { useEffect, useState } from "react";
import TaskListModal from "./TaskListModal";
import { queryClient } from "../../common/services/queryClient";

const TaskList: React.FC = () => {
  const { dispatch } = useTaskData();
  const [selectedTaskList, setSelectedTaskList] = useState({} as any);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();

  const { data, isLoading } = useGetTaskList(URLS.TASK_LIST);
  const { mutate, isSuccess } = useDeleteTaskList(
    URLS.TASK_DELETE + `${deleteId}`,
  );

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setIsEdit(false);
    setSelectedTaskList({});
  };

  const handleEdit = (selectedTask: any) => {
    setSelectedTaskList(selectedTask);
    setShowModal(true);
    setIsEdit(true);
  };

  const handleDelete = (id: number) => {
    setDeleteId(id);
    mutate({ id: id });
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["GET_TASK_LIST"] });
    }
  }, [isSuccess]);

  return (
    <>
      {isLoading && <Loader />}
      {showModal && (
        <TaskListModal
          show={showModal}
          onHide={handleClose}
          title={isEdit ? "Edit" : `Add new task list `}
          isEdit={isEdit}
          selectedTaskList={selectedTaskList}
        />
      )}

      <div className="task-list">
        {data?.map((task: any) => (
          <Row xs={1} sm={2} md={3} lg={4} className="g-4">
            <Col key={task.id}>
              <Card className={task.isCompleted ? "bg-success text-white" : ""}>
                <Card.Body>
                  <Card.Text
                    onClick={() =>
                      dispatch({
                        type: "UPDATE_FIELDS",
                        payload: {
                          selectedTaskList: task,
                          isOpenSubTask: true,
                        },
                      })
                    }
                  >
                    {task.title}
                  </Card.Text>
                  <p className="p-0" onClick={() => handleEdit(task)}>
                    edit
                  </p>
                  <p className="p-0" onClick={() => handleDelete(task.id)}>
                    delete
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </div>
      <Button onClick={handleShow}>New List </Button>
    </>
  );
};

export default TaskList;
