import React, { Component } from "react";
import "./Layout.css";
import MenuToggle from "../../component/Navigation/MenuToggle/MenuToggle";
import Drower from "../../component/Navigation/Drower/Drower";

class Layout extends Component {
  state = {
    menu: false,
  };

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu,
    });
  };

  menuCloseHandler= () => {
      this.setState({
          menu: false
      })
  }

  render() {
    return (
      <div className="Layout">
        <Drower isOpen={this.state.menu} onClose={ this.menuCloseHandler} />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>{this.props.children}</main>
        
      </div>
    );
  }
}

export default Layout;
