import { Steps as AntSteps, Button } from "antd";
import { useEffect, useState } from "react";
import Media from "../../pages/media/Media";
import Question from "../../pages/question/Question";
import Reading from "../../pages/reading/Reading";
import Translations from "../../pages/translations/Translation";
import Writing from "../../pages/writing/Writing";
import axios from "axios";
import MAIN_URL from "../../url/Urls";

const CustomSteps = ({ id, setModalOpen, reading, writing_id }) => {
  const [current, setCurrent] = useState(0);
  const [readingId, setReadingId] = useState(null);
  const [readingData, setReadingData] = useState([]);
  useEffect(() => {
    if (reading) {
      setCurrent(0);
    }
  }, [reading]);

  useEffect(() => {
    axios
      .get(MAIN_URL + "/lessons/" + id, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then(({ data }) => {
        setReadingData(data?.text_question_sets?.[0]?.questions);
        setReadingId(data?.text_question_sets?.[0]?.id);
      })
      .catch((err) => {});
  }, [id]);

  const steps = !reading
    ? [
        {
          title: "Media",
          content: <Media id={id} setCurrent={setCurrent} />,
        },
        {
          title: "Translation",
          content: <Translations setCurrent={setCurrent} />,
        },
        {
          title: "Question",
          content: (
            <Question setModalOpen={setModalOpen} setCurrent={setCurrent} />
          ),
        },
      ]
    : [
        {
          title: "Reading",
          content: <Reading id={id} setModalOpen={setModalOpen} />,
        },
        {
          title: "Writing",
          content: <Writing id={readingId} setModalOpen={setModalOpen} data={readingData} />,
        },
      ];

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({
    key: item.title,
    title: item.title,
  }));

  const contentStyle = {
    padding: "30px 0 ",
  };
  //   const currentContent = steps[current] ? steps[current].content : null;
  return (
    <>
      <AntSteps current={current} items={items} style={{ width: "50%" }} />
      <div style={contentStyle}>{steps[current]?.content}</div>
      <div style={{ width: "50%" }}>
        {current < steps.length - 1 && (
          <Button type="primary" onClick={next}>
            Next
          </Button>
        )}
        {!reading && current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => {
              setModalOpen(false);
            }}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: "0 8px" }} onClick={prev}>
            Previous
          </Button>
        )}
      </div>
    </>
  );
};

export default CustomSteps;
