import React, { Component } from "react";
import "./Quest.css";
import ActiveQuest from "../../component/ActiveQuest/ActiveQuest";
import FinishQuestion from "../../component/FinishQuestion/FinishQuestion";
import axios from "../../axios/axios";
import Loader from "../../component/UI/Loader/Loader";

class Quest extends Component {
  state = {
    results: {}, //{ [id]: 'success'}
    activeQuestion: 0,
    isFinished: false,
    answerState: null, // { [id]: 'success'}
    loader: true,
    quest: [],
  };

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }

    const question = this.state.quest[this.state.activeQuestion];
    const results = this.state.results;

    if (question.rightAnswerId === answerId) {
      if (!results[answerId]) {
        results[answerId] = "success";
      }
      this.setState({
        answerState: { [answerId]: "success" },
        results,
      });

      const timeOut = window.setTimeout(() => {
        if (this.isFinished()) {
          this.setState({
            isFinished: true,
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
        window.clearTimeout(timeOut);
      }, 1000);
    } else {
      results[answerId] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
      });
    }
  };

  isFinished() {
    return this.state.activeQuestion + 1 === this.state.quest.length;
  }

  onRetryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  };

  async componentDidMount() {
    try {
      const respons = await axios.get(
        `/quizes/${this.props.match.params.id}.json`
      );
      const quest = respons.data;

      this.setState({
        quest,
        loader: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="Quest">
        <div className="QuestWrapper">
          <h1>Дайте відповідь на всі Питання</h1>
          {this.state.loader ? (
            <Loader />
          ) : this.state.isFinished ? (
            <FinishQuestion
              results={this.state.results}
              question={this.state.quest}
              onRetry={this.onRetryHandler}
            />
          ) : (
            <ActiveQuest
              answers={this.state.quest[this.state.activeQuestion].answers}
              question={this.state.quest[this.state.activeQuestion].question}
              onAnswerClick={this.onAnswerClickHandler}
              questionLength={this.state.quest.length}
              answerNumber={this.state.activeQuestion + 1}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Quest;
