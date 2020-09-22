import React, { Component } from "react";
import "./QuestList.css";
import { NavLink } from "react-router-dom";
import axios from "../../axios/axios";
import Loader from "../../component/UI/Loader/Loader";

class QuestList extends Component {
  state = {
    quizes: [],
    loader: true,
  };

  renderQuizes() {
    return this.state.quizes.map((quest) => {
      return (
        <li key={quest.id}>
          <NavLink to={"/quest/" + quest.id}> {quest.name}</NavLink>
        </li>
      );
    });
  }

  async componentDidMount() {
    try {
      const respons = await axios.get("/quizes.json");

      const quizes = [];

      Object.keys(respons.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест ${index + 1}`,
        });
      });

      this.setState({
        quizes,
        loader: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <div className="QuestList">
        <div>
          <h1>Список тестів</h1>

          {this.state.loader ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}

export default QuestList;
