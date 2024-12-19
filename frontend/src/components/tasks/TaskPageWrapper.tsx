import { Button } from "react-bootstrap";
import { useTaskData } from "../../provider/taskProvider";
import TaskList from "./TaskList";

const TaskPageWrapper: React.FC = () => {
  const { state, dispatch } = useTaskData();

  return (
    <>
      <div className="task-list">
        <TaskList />
      </div>
      {state?.selectedTaskList && <div className="task-details"></div>}
    </>
  );
};

export default TaskPageWrapper;
