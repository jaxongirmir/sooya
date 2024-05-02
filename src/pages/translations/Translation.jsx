import { DeleteOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLessonId } from "../../slices/lessonId";
import { selectMediaId } from "../../slices/mediaId";
import { selectTranslationId } from "../../slices/translationId";
import { addTranslation } from "../../slices/translationSlice";
import styles from "./Translation.module.css";

const Translation = ({ setCurrent }) => {
  const [uzb, setUzb] = useState([""]);
  const [eng, setEng] = useState([""]);
  const [uzbErrors, setUzbErrors] = useState([]);
  const [engErrors, setEngErrors] = useState([]);
  const [id, setId] = useState("");
  const dispatch = useDispatch();
  const lessonId = useSelector(selectLessonId);
  const mediaInfo = useSelector(selectMediaId);
  const loading = useSelector((state) => state.translation.loading);
  const error = useSelector((state) => state.translation.error);
  const mediaId = mediaInfo.payload;
  console.log(mediaId);
  const translation = useSelector((state) => state.translation.translations);
  console.log(translation);

  const handleAddInput = () => {
    setUzb([...uzb, ""]);
    setEng([...eng, ""]);
    setUzbErrors([...uzbErrors, null]);
    setEngErrors([...engErrors, null]);
  };

  const handleRemoveInput = (index) => {
    const updatedUzb = [...uzb];
    const updatedEng = [...eng];
    updatedUzb.splice(index, 1);
    updatedEng.splice(index, 1);
    setUzb(updatedUzb);
    setEng(updatedEng);
  };

  const handleInputChange = (index, value) => {
    const updatedInputs = [...uzb];
    updatedInputs[index] = value;
    setUzb(updatedInputs);
    setUzbErrors(
      updatedInputs.map((input) =>
        input.trim() === "" ? "Please input your word!" : null
      )
    );
  };

  const handleInputChangeEng = (index, value) => {
    const updatedInputs = [...eng];
    updatedInputs[index] = value;
    setEng(updatedInputs);
    setEngErrors(
      updatedInputs.map((input) =>
        input.trim() === "" ? "Please input your word!" : null
      )
    );
  };

  const handleRemoveBothInputs = (index) => {
    handleRemoveInput(index);
    handleRemoveInput(index);
  };

  const handleClick = () => {
    if (
      uzb.some((input) => input.trim() === "") ||
      eng.some((input) => input.trim() === "")
    ) {
      message.error("Please fill all input fields.");
      return;
    }

    const array_of_objects = uzb.map((uzbValue, index) => ({
      [uzbValue]: eng[index],
    }));
    console.log(lessonId, mediaId);
    dispatch(
      addTranslation({
        lessonId,
        mediaId: mediaId.mediaId.mediaId,
        array_of_objects,
      })
    )
      .then((res) => {
        setId(res.payload.id);
        dispatch(selectTranslationId(res.payload.id));
        setCurrent((prev) => prev + 1);
      })
      .catch((err) => console.log(err));
  };

  const isCreateDisabled =
    uzb.some((input) => input.trim() === "") ||
    eng.some((input) => input.trim() === "");

  return (
    <Form onFinish={handleClick}>
      <div className={styles.inputs}>
        <div className={styles.uzb}>
          <p>uzb</p>
          {uzb.map((input, index) => (
            <div key={index}>
              <Input
                type="text"
                value={input}
                onChange={(e) => handleInputChange(index, e.target.value)}
                rules={[
                  {
                    required: true,
                    message: uzbErrors[index] || "Please input your word!",
                  },
                ]}
              />
              <Button
                onClick={() => handleRemoveBothInputs(index)}
                className={styles.remove}
              >
                <DeleteOutlined />
              </Button>
            </div>
          ))}
        </div>
        <div className={styles.eng}>
          <p>eng</p>
          {eng.map((input, index) => (
            <div key={index}>
              <Input
                type="text"
                value={input}
                onChange={(e) => handleInputChangeEng(index, e.target.value)}
                rules={[
                  {
                    required: true,
                    message: engErrors[index] || "Please input your word!",
                  },
                ]}
              />
              <button
                onClick={() => handleRemoveBothInputs(index)}
                className={styles.hidden}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
      <Button loading={loading} disabled={isCreateDisabled} htmlType="submit">
        Create
      </Button>
      <Button onClick={handleAddInput} className={styles.add_btn}>
        Add Input
      </Button>
    </Form>
  );
};

export default Translation;
