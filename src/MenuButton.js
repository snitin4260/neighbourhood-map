import React, { Component } from "react";
import "./MenuButton.css";

class MenuButton extends Component {
  render() {
    let display = "show";
    let visibility = String(this.props.sidebarVisible);
    if (this.props.sidebarVisible) display = "hide";
    return (
      <button
        tabIndex="0"
        aria-hidden={visibility}
        className={display}
        id="roundButton"
        aria-label="menu"
        onMouseDown={this.props.handleMouseDown}
        onKeyDown={this.props.hambKeyPress}
      >
        {" "}
      </button>
    );
  }
}

export default MenuButton;
