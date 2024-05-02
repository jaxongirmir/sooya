import { Button, Input } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addReading } from "../../slices/readingSlice";
import styles from "./Reading.module.css";
const Reading = ({ id, setModalOpen }) => {
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.reading.loading);
  const handClick = () => {
    dispatch(addReading({ id, text }));
    setModalOpen(false);
    setText("");
  };
  return (
    <div className={styles.reading_form}>
      <h3>Create Reading</h3>
      <Input.TextArea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your text"
        autoSize={{
          minRows: 10,
        }}
      ></Input.TextArea>
      <Button
        type="primary"
        onClick={handClick}
        loading={loading}
        disabled={text.length <= 4}
      >
        Create
      </Button>
    </div>
  );
};

export default Reading;
