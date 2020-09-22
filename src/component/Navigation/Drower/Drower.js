import React, { Component } from "react";
import "./Drower.css";
import BackDrop from "../../UI/Button/BackDrop/BackDrop";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Список Тестів", exact: true },
  { to: "/auth", label: "Авторизація", exact: false },
  { to: "/quest-creator", label: "Створити тест", exact: false },
];

class Drower extends Component {
  handleClick = () => {
    this.props.onClose()
  };

  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          <NavLink
            to={link.to}
            exact={link.exact}
            activeClassName="active"
            onClick={this.handleClick}
          >
            {link.label}
          </NavLink>
        </li>
      );
    });
  }

  render() {
    const cls = ["Drower"];

    if (!this.props.isOpen) {
      cls.push("close");
    }

    return (
      <>
        <nav className={cls.join(" ")}>
          <ul>{this.renderLinks()}</ul>
        </nav>
        {this.props.isOpen ? <BackDrop onClick={this.props.onClose} /> : null}
      </>
    );
  }
}

export default Drower;
