import React, { Component } from "react";
import "./App.css";
import loadMaps from "./utils/googleMaps";
import venues from "./utils/foursquareVenue";

class App extends Component {
  state = {
    query: ""
  };
  componentDidMount() {
    Promise.all([loadMaps(), venues()]).then(res => {
      let google = res[0];
      let places = res[1].json();
      this.google = google;
      this.infowindow = new google.maps.InfoWindow();
      this.bounds = new google.maps.LatLngBounds();
      this.markers = [];
      places
        .then(res => {
          return res.response.groups[0].items;
        })
        .then(items => {
          this.map = new google.maps.Map(document.getElementById("map"), {
            zoom: 11,
            center: {
              lat: items[0].venue.location.lat,
              lng: items[0].venue.location.lng
            }
          });
          items.forEach(item => {
            let marker = new google.maps.Marker({
              map: this.map,
              position: {
                lat: item.venue.location.lat,
                lng: item.venue.location.lng
              },
              title: item.venue.name,
              animation: google.maps.Animation.DROP,
              id: item.venue.id
            });
            this.bounds.extend(marker.position);

            this.markers.push(marker);
            // marker.addEventListener("click", function() {
            //   // showInfo(this);
            // });
          });
          this.map.fitBounds(this.bounds);
        });
    });
  }

  changeQuery(query) {
    this.setState(
      {
        query
      },
      this.filterVenues
    );
  }

  filterVenues() {
    this.markers.forEach(marker => {
      console.log(marker);
      let query = this.state.query.toLowerCase();
      let markerTitle = marker.title.toLowerCase();

      markerTitle.includes(query)
        ? marker.setVisible(true)
        : marker.setVisible(false);
    });
  }

  render() {
    return (
      <main>
        <div id="map"> </div>
        <div id="sidebar">
          <input
            id="filter-input"
            value={this.state.query}
            placeholder="filter"
            onChange={e => {
              this.changeQuery(e.target.value);
            }}
          />
        </div>
      </main>
    );
  }
}

export default App;
