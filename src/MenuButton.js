import React, { Component } from "react";
import "./MenuButton.css";

class MenuButton extends Component {
  render() {
    let visibility = String(this.props.visible);

    return (
      <button
        tabIndex="0"
        aria-hidden={visibility}
        id="roundButton"
        onMouseDown={this.props.handleMouseDown}
        onKeyDown={this.props.hambKeyPress}
      >
        {" "}
      </button>
    );
  }
}

export default MenuButton;
