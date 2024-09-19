import React, { useRef, useState } from "react";
import "./Quiz.css";
import { data } from "../../assets/data";

const Quiz = () => {
  const [index, setIndex] = useState(0);
  const [question, setQuestion] = useState(data[index]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);

  let option1 = useRef(null);
  let option2 = useRef(null);
  let option3 = useRef(null);
  let option4 = useRef(null);

  let option_array = [option1, option2, option3, option4];

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.ans === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.ans - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const next = () => {
    if (lock) {
      if (index < data.length - 1) {
        setIndex((prevIndex) => {
          const newIndex = prevIndex + 1;
          setQuestion(data[newIndex]);
          return newIndex;
        });
        setLock(false);

        option_array.forEach((option) => {
          option.current.classList.remove("wrong");
          option.current.classList.remove("correct");
        });
      } else {
        alert(`Quiz finished! Your score is ${score} out of ${data.length}`);
      }
    }
  };

  return (
    <div className="container">
      <h1>Quiz app</h1>
      <hr />
      <h2>
        {index + 1}. {question.question}
      </h2>
      <ul>
        <li
          onClick={(e) => {
            checkAns(e, 1);
          }}
          ref={option1}
        >
          {question.option1}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, 2);
          }}
          ref={option2}
        >
          {question.option2}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, 3);
          }}
          ref={option3}
        >
          {question.option3}
        </li>
        <li
          onClick={(e) => {
            checkAns(e, 4);
          }}
          ref={option4}
        >
          {question.option4}
        </li>
      </ul>
      <button onClick={next}>Next</button>
      <div className="index">
        {index + 1} of {data.length} questions
      </div>
    </div>
  );
};

export default Quiz;
