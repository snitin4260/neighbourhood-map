import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";

class SideBar extends Component {
  render() {
    let visibility = "hide";

    if (this.props.sidebarVisible) {
      visibility = "show";
    }
    return (
      //display sidebar based on class show or hide
      // if class = show then display it orelse hide it
      <div
        id="sidebar"
        aria-hidden={String(!this.props.sidebarVisible)}
        className={visibility}
      >
        <div>
          <button
            id="close"
            tabIndex="0"
            aria-label="Close"
            onMouseDown={this.props.handleMouseDown}
            onKeyDown={this.props.closeKeyEnter}
          >
            {" "}
            <i className="fa fa-window-close fa-3x"> </i>
          </button>
        </div>
        <input
          id="filter-input"
          tabIndex="0"
          role="search"
          aria-label="search"
          value={this.props.query}
          placeholder="Filter Hotels"
          onChange={e => {
            this.props.changeQuery(e.target.value);
          }}
        />{" "}
        <i className="fa fa-filter fa-2x " aria-label="hidden" />
        {this.props.filteredHotels &&
          this.props.filteredHotels.length > 0 &&
          this.props.filteredHotels.map((hotel, i) => (
            <div
              key={i}
              tabIndex="0"
              className="sidebar-item"
              role="button"
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
