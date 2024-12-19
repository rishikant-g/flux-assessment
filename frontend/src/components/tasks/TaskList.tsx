import { Button, Card, Col, Container, Row } from "react-bootstrap";
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
import ITaskListResponse from "../../common/type/model/ITaskListResponse";

const TaskList: React.FC = () => {
  const { state, dispatch } = useTaskData();
  const [selectedTaskList, setSelectedTaskList] = useState({} as any);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number>();

  const {
    data,
    isLoading,
    isFetching,
    isSuccess: isSuccessTaskList,
  } = useGetTaskList(URLS.TASK_LIST);
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
      console.log("here>>>", state?.selectedTask?.id, deleteId);
      if (state?.selectedTaskList?.id === deleteId) {
        dispatch({
          type: "UPDATE_FIELDS",
          payload: {
            selectedTaskList: {},
            isOpenSubTask: false,
          },
        });
      }

      queryClient.invalidateQueries({ queryKey: ["GET_TASK_LIST"] });
      queryClient.invalidateQueries({ queryKey: ["GET_TASK"] });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (data) {
      dispatch({
        type: "UPDATE_FIELDS",
        payload: {
          taskData: data,
        },
      });
    }
  }, [isLoading, isFetching, isSuccessTaskList]);

  console.log("state?.taskData", state?.taskData);

  return (
    <Container className="mt-2 ">
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

      {/* <div className="task-list"> */}
      <div>
        {state?.taskData?.map((task: ITaskListResponse) => (
          <Row xs={1} sm={6} md={6} lg={6}>
            <Col key={task.id}>
              <Card className="d-flex">
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
                    {task.checked_items} / {task.items_count}
                    <br />
                    {task.title}
                  </Card.Text>
                  <p className="p-0" onClick={() => handleEdit(task)}>
                    edit
                  </p>
                  <p className="p-0" onClick={() => handleDelete(task.id || 0)}>
                    delete
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        ))}
      </div>
      <Button onClick={handleShow}>New List </Button>
    </Container>
  );
};

export default TaskList;
