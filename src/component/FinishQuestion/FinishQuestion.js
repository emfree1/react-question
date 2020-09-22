import React from "react";
import "./FinishQuestion.css";
import Button from "../UI/Button/Button";
import { Link } from "react-router-dom";

const FinishQuestion = (props) => {
  const successCount = Object.keys(props.results).reduce((total, key) => {
    if (props.results[key] === "success") {
      total++;
    }
    return total;
  }, 0);

  return (
    <div className="FinishQuestion">
      <ul>
        {props.question.map((quest, index) => {
          const classes = [
            "fa",
            props.results[quest.id] === "error"
              ? "fa-times error"
              : "fa-check success",
          ];

          return (
            <li key={index}>
              <strong>{index + 1}</strong>. &nbsp;
              {quest.question}
              <i className={classes.join(" ")} />
            </li>
          );
        })}
      </ul>
      <p>
        Правильно {successCount} з {props.question.length}
      </p>
      <div>
        <Button onClick={props.onRetry} type="primary">
          Повторити
        </Button>
        <Link to='/'>
          <Button type="successs">Перейти до списку тестів</Button>
        </Link>
      </div>
    </div>
  );
};

export default FinishQuestion;
