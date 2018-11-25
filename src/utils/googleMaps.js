function loadMaps() {
  return new Promise(function(resolve, reject) {
    // define the global callback that will run when google maps is loaded
    window.resolveGoogleMapsPromise = function() {
      // resolve the google object
      resolve(window.google);
      console.log("inside promise");
      // delete the global callback to tidy up since it is no longer needed
      delete window.resolveGoogleMapsPromise;
    };

    const script = document.createElement("script");
    const API_KEY = "AIzaSyDOS3gAaYOUVX9N38VpLaq83f0rBOqdnjs";
    script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${API_KEY}&callback=resolveGoogleMapsPromise`;
    script.async = true;
    document.body.appendChild(script);
  });
}

export default loadMaps;
