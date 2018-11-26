import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  render() {
    let visibility = "hide";

    if (this.props.visible) {
      visibility = "show";
    }
    return (
      <div
        id="sidebar"
        aria-hidden={String(!this.props.visible)}
        className={visibility}
      >
        <div
          id="close"
          tabIndex="0"
          onMouseDown={this.props.handleMouseDown}
          onKeyDown={this.props.closeKeyEnter}
        >
          <button>
            {" "}
            <i className="fa fa-window-close fa-3x"> </i>
          </button>
        </div>
        <input
          id="filter-input"
          tabIndex="0"
          role="search"
          value={this.props.query}
          placeholder="Filter Hotels"
          onChange={e => {
            this.props.changeQuery(e.target.value);
          }}
        />{" "}
        <i className="fa fa-filter fa-2x  " />
        {this.props.filteredHotels &&
          this.props.filteredHotels.length > 0 &&
          this.props.filteredHotels.map((hotel, i) => (
            <div
              key={i}
              tabIndex="0"
              className="sidebar-item"
              onClick={() => {
                this.props.showMarker(hotel);
              }}
              onKeyDown={e => {
                this.props.listItemEnter(e, hotel);
              }}
            >
              {" "}
              {hotel.venue.name}{" "}
            </div>
          ))}{" "}
      </div>
    );
  }
}

export default SideBar;
