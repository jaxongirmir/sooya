import { Modal } from "antd";
import { useState } from "react";
import CustomSteps from "../steps/Steps";

const LessonModal = ({ setModalOpen, modalOpen, item, reading }) => {
  const [confirmLoading, setConfirmLoading] = useState(false);
  const handleOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      setModalOpen(false);
      setConfirmLoading(false);
    }, 1000);
  };
  return (
    <>
      <Modal
        title=""
        open={modalOpen === item}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={() => setModalOpen(false)}
        footer={null}
        style={{ width: "800px" }}
      >
        <CustomSteps id={item} setModalOpen={setModalOpen} reading={reading} />
      </Modal>
    </>
  );
};

export default LessonModal;
