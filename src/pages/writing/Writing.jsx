import { Button, Input } from "antd";
import { useState } from "react";
import styles from "./Writing.module.css";
import axios from "axios";
import MAIN_URL from "../../url/Urls";

const Writing = ({ id, setModalOpen, data }) => {
  const [text, setText] = useState(
    data?.length === 5 ? data?.map(({ text }) => text) : ["", "", "", "", ""]
  );

  const [loading, setLoading] = useState(false);
  const handClick = () => {
    setLoading(true);
    text.map((item) => {
      return axios
        .post(
          MAIN_URL + "/questions",
          {
            question: {
              text: item,
              text_question_set_id: id,
            },
          },
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then(({ data }) => {
          setLoading(false);
          console.log(data, "data");
          setText(["", "", "", "", ""]);
          setModalOpen(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log(err, "error");
        });
    });
  };

  return (
    <div className={styles.reading_form}>
      <h3>Create Reading</h3>
      {Array.from({
        length: 5,
      }).map((_, index) => (
        <Input
          key={index}
          value={text[index]}
          onChange={(e) =>
            setText(
              text.map((item, i) => (i === index ? e.target.value : item))
            )
          }
          placeholder="Enter your text"
          autoSize={{
            minRows: 10,
          }}
          disabled={data?.length === 5}
        />
      ))}
      <Button
        type="primary"
        onClick={handClick}
        loading={loading}
        disabled={text.some((item) => item.length <= 2) || data?.length === 5}
      >
        Create
      </Button>
    </div>
  );
};

export default Writing;
