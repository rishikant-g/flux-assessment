import { Button, Col, Container, Row } from "react-bootstrap";
import { useTaskData } from "../../provider/taskProvider";
import TaskList from "./TaskList";
import Task from "./Task";

const TaskPageWrapper: React.FC = () => {
  const { state, dispatch } = useTaskData();

  return (
    // <Container>
      <Row>
        <Col xs={12} sm={6}>
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
    // </Container>
  );
};

export default TaskPageWrapper;
