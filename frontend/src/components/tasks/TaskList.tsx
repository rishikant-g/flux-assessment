import { Button } from "react-bootstrap";
import { useGetTaskList } from "../../common/services/useTaskList";
import { URLS } from "../../common/constants/urls";
import { useTaskData } from "../../provider/taskProvider";
import Loader from "../common/Loader";
import TaskModal from "./TaskModal";
import { useState } from "react";
import ModalComponent from "./TaskModal";

const TaskList: React.FC = () => {
  const { state, dispatch } = useTaskData();

  const { data, isLoading } = useGetTaskList(URLS.TASK_LIST);
  console.log("data>>>>>", data);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const handleShow = () => setShowModal(true); // Show the modal
  const handleClose = () => setShowModal(false); // Close the modal

  return (
    <>
      {isLoading && <Loader />}
      {showModal && (
        <ModalComponent
          show={showModal}
          onHide={handleClose}
          title="List Title"
        />
      )}

      <div className="task-list">
        {data?.data?.map((d: any) => (
          <>
            <p key={d.title}>{d.title}</p>
          </>
        ))}
      </div>
      <Button onClick={handleShow}>New List 1</Button>
    </>
  );
};

export default TaskList;
