import React, { Component } from "react";
import "./App.css";
import loadMaps from "./utils/googleMaps";
import venues from "./utils/foursquareVenue";
import SideBar from "./Sidebar";
import MenuButton from "./MenuButton";

class App extends Component {
  state = {
    query: "",
    filteredHotels: [],
    visible: false
  };

  componentDidMount() {
    Promise.all([loadMaps(), venues()]).then(res => {
      let google = res[0];
      let places = res[1].json();
      this.google = google;
      let largeInfoWindow = new google.maps.InfoWindow();
      this.infoWindow = largeInfoWindow;
      this.bounds = new google.maps.LatLngBounds();
      this.markers = [];

      //promise
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
          //we are having a refernce  to all hotel since
          // in component since component will dsiplay only
          //filtered hotles
          this.allhotels = items;
          this.setState({ filteredHotels: this.allhotels });
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
            marker.addListener("click", function() {
              populateInfoWindow(this, largeInfoWindow);
            });
          });
          //map extends to fit markers
          this.map.fitBounds(this.bounds);
          //show info window if not laready showing for that particular
          //window
          let populateInfoWindow = (marker, infoWindow) => {
            if (infoWindow.marker !== marker) {
              infoWindow.marker = marker;
              infoWindow.setContent(`<div>${marker.title}</div>`);
              infoWindow.open(this.map, marker);
              infoWindow.addListener("closeclick", function() {
                infoWindow.close();
              });
            }
          };
        });
    });
  }
  //Input controlled by component through query
  changeQuery = nQuery => {
    this.setState(
      {
        query: nQuery.trim()
      },
      this.filterHotels
    );
  };
  toggleMenu = () => {
    this.setState({
      visible: !this.state.visible
    });
  };

  handleMouseDown = e => {
    this.toggleMenu();

    console.log("clicked");
    //e.stopPropagation();
  };

  showMarker = hotel => {
    //find the marker via unique id
    let matchMarker = this.markers.filter(marker => {
      return marker.id === hotel.venue.id;
    });

    //open infoview of matched marker
    this.infoWindow.marker = matchMarker[0];
    this.infoWindow.setContent(`<div>${matchMarker[0].title}</div>`);
    this.infoWindow.open(this.map, matchMarker[0]);

    //animate  marker

    if (matchMarker[0].getAnimation() !== null) {
      matchMarker[0].setAnimation(null);
    } else {
      matchMarker[0].setAnimation(this.google.maps.Animation.BOUNCE);
    }
    setTimeout(() => {
      matchMarker[0].setAnimation(null);
    }, 400);
  };

  /***** ******************************************/

  filterHotels() {
    this.infoWindow.close();
    let filteredHotels = this.allhotels.filter(hotel => {
      return hotel.venue.name
        .toLowerCase()
        .includes(this.state.query.toLowerCase());
    });

    this.setState({
      filteredHotels
    });
    this.markers.forEach(marker => {
      let query = this.state.query.toLowerCase();
      let markerTitle = marker.title.toLowerCase();

      markerTitle.includes(query)
        ? marker.setVisible(true)
        : marker.setVisible(false);
    });
  }
  /********************** *********************************/

  render() {
    return (
      <main>
        <div id="map"> </div>
        <MenuButton
          handleMouseDown={this.handleMouseDown}
          visible={this.state.visible}
        />
        <SideBar
          value={this.state.query}
          changeQuery={this.changeQuery}
          filteredHotels={this.state.filteredHotels}
          showMarker={this.showMarker}
          visible={this.state.visible}
          handleMouseDown={this.handleMouseDown}
        />
      </main>
    );
  }
}

export default App;
