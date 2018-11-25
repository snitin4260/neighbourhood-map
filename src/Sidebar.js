import React, { Component } from "react";

class SideBar extends Component {
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
        <div id="close" onMouseDown={this.props.handleMouseDown}>
          <i class="fa fa-window-close fa-3x"> </i>
        </div>
        <input
          id="filter-input"
          value={this.props.query}
          placeholder="Filter Hotels"
          onChange={e => {
            this.props.changeQuery(e.target.value);
          }}
        />{" "}
        {this.props.filteredHotels &&
          this.props.filteredHotels.length > 0 &&
          this.props.filteredHotels.map((hotel, i) => (
            <div
              key={i}
              className="sidebar-item"
              onClick={() => {
                this.props.handleMouseDown();
                this.props.showMarker(hotel);
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
