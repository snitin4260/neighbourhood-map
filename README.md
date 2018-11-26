# About Project

In this project, I was asked to fetch locations from api / display hardcoded locations and display them on the map with animation. I also added a list view which filters the query and displays on the map

## API used

- foursquare api
- google maps api

## How to start the project

- npm install
- npm run start
- For production code, use npm run build
- See the live changes in browser window

## My Implementation

- I have used a small blue colored button to toogle the list view
- The list view has search functionality. The search filters the markers on map as well as the list view
- The list view items can be clicked to display the respective hotel location on map along with its l ocation
- CRA comes inbuilt with ServiceWorker whcih can be enabled by removing the unregister method with register method
- I have the made the app responsive and accessible
- I load recommended places for a particular city from Foursquare API and map the locations through Google Maps Api. When the markers or the list view is clicked, the address derived from the Foursquare api is shown along with a marker animation
