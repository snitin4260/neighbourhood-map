import React, { Component } from "react";
import "./MenuButton.css";

class MenuButton extends Component {
  render() {
    let visibility = String(this.props.visible);

    return (
      <button
        aria-hidden={visibility}
        id="roundButton"
        onMouseDown={this.props.handleMouseDown}
      >
        {" "}
      </button>
    );
  }
}

export default MenuButton;
