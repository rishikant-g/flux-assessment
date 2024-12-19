import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useTaskData } from "../../provider/taskProvider";
import TaskList from "./TaskList";
import Task from "./Task";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "../../common/utils/util";
import { useGetTaskList } from "../../common/services/useTaskList";
import { URLS } from "../../common/constants/urls";

const TaskPageWrapper: React.FC = () => {
  const { state, dispatch } = useTaskData();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setsortBy] = useState<string>("asc");

  const {
    data,
    isLoading,
    isSuccess: isSuccessTaskList,
  } = useGetTaskList(URLS.TASK_LIST, searchQuery, sortBy);

  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setSearchQuery(query);
    }, 500),
    [],
  );

  const handleSearch = (query: string) => {
    debouncedSearch(query);
  };

  useEffect(() => {
    if (data) {
      dispatch({
        type: "UPDATE_FIELDS",
        payload: {
          taskData: data,
          isOpenSubTask: false,
        },
      });
    }
  }, [isLoading, isSuccessTaskList, data]);

  return (
    <Container>
      <Row>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              onChange={(e) => handleSearch(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Button
          onClick={() => {
            if (sortBy === "asc") {
              setsortBy("desc");
            } else {
              setsortBy("asc");
            }
          }}
        >
          {sortBy === "asc" ? "DESC" : "ASC"}
        </Button>
        <Col>
          <div className="task-list">
            <TaskList />
          </div>
        </Col>
        <Col>
          {state.isOpenSubTask && (
            <div className="task-details">
              <Task />
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TaskPageWrapper;
