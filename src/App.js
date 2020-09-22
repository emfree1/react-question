import React, { Component } from "react";
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import {Route, Switch} from 'react-router-dom'
import Quest from "./containers/Quest/Quest";
import Auth from "./containers/Auth/Auth";
import QuestCreator from "./containers/QuestCreator/QuestCreator";
import QuestList from "./containers/QuestList/QuestList";

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/auth' component={Auth}/>
          <Route path='/quest-creator' component={QuestCreator}/>
          <Route path='/quest/:id' component={Quest}/>
          <Route path='/' component={QuestList}/>
        </Switch>
      </Layout>
    )
  }
}

export default App;
