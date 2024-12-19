import { URLS } from "../../common/constants/urls";
import { useGetTask } from "../../common/services/useTask";
import { useTaskData } from "../../provider/taskProvider";
import Loader from "../common/Loader";

const Task: React.FC<TASK> = () => {
  const { state, dispatch } = useTaskData();

  const { data, isLoading } = useGetTask(
    URLS.TASK_LIST,
    { task_id: state?.selectedTaskList?.id },
    { enabled: !!state?.selectedTaskList?.id },
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {isLoading && <Loader />}
      <div className="task-list">
        {data?.data?.map((d: any) => (
          <>
            <p key={d.title}>{d.title}</p>
          </>
        ))}
      </div>
    </>
  );
};

export default Task;
