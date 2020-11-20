import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";

export class MapContainer extends Component {
  state = {
    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,
    loading: false,
    data: {},
  };

  onMarkerClick = (props, marker, e) => {
    fetch(
      `https://api.agrihawk.in/api/plots/getLatestDataForMap?plotId=${props.name}&access_token=0DnJcoZVNNCjuORU2JpSzN57gdMAtYdeSWqe1Ri24Y87KLhhtYC3ZYMLaDYuJHss`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("data map => ", data);
        this.setState({
          data,
          loading: false,
          activeMarker: marker,
          selectedPlace: props,
          showingInfoWindow: true,
        });
      })
      .catch((err) => console.log("err => ", err));
  };
  onInfoWindowClose = () =>
    this.setState({
      activeMarker: null,
      showingInfoWindow: false,
    });

  onMapClicked = () => {
    if (this.state.showingInfoWindow)
      this.setState({
        activeMarker: null,
        showingInfoWindow: false,
      });
  };
  render() {
    const {
      state: { data, loading, selectedPlace },
      props: { mapData, google },
    } = this;
    return (
      <Map
        google={google}
        style={{ height: "100%", position: "relative", width: "100%" }}
        zoom={1}
      >
        {mapData.map((val, i) => {
          return (
            <Marker
              key={i}
              name={val.plotId}
              onClick={this.onMarkerClick}
              position={{ ...val.location }}
            />
          );
        })}

        <InfoWindow
          marker={this.state.activeMarker}
          onClose={this.onInfoWindowClose}
          visible={this.state.showingInfoWindow}
        >
          <div>
            {loading ? (
              <h1>loading...</h1>
            ) : (
              <div>
                <p>PlotID: {selectedPlace && selectedPlace.name}</p>
                <p>AirHumidity: {data && data.airHumidity}</p>
              </div>
            )}
          </div>
        </InfoWindow>
      </Map>
    );
  }
}
// Please add your google api key
export default GoogleApiWrapper({
  apiKey: "",
})(MapContainer);
