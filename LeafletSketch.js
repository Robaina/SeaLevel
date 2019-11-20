// WebGL Earth visualization of Sea Level Trends
let markers;
let stations;

function initialize() {
  let options = {
    'center': [28.5, -16],
    'altitude': 10000 * 1e3, // in metres
    'atmosphere': true,
    'sky': true,
    'dragging': true,
    'tilting': true,
    'zooming': true
  }
  let earth = new L.map('earth_div', options);
  // L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);

  // L.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', {
  //   tileSize: 256,
  //   bounds: [[-85, -180], [85, 180]],
  //   minZoom: 0,
  //   maxZoom: 16,
  //   attribution: 'WebGLEarth example',
  //   tms: true
  // }).addTo(earth);

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox.streets',
    accessToken: 'your.mapbox.access.token'
}).addTo(earth);

  // markers = setMapMarkers(earth, stations);
  //earth.setView([0, 0], 1);

  // Start a simple rotation animation
  // let before = null;
  // requestAnimationFrame(function animate(now) {
  //   let c = earth.getPosition();
  //   let elapsed = before? now - before: 0;
  //   before = now;
  //   earth.setCenter([c[0], c[1] - 0.05*(elapsed/30)]);
  //   requestAnimationFrame(animate);
  // });
}


function setMapMarkers(earth, stations) {
  let markers = {};
  let marker_url ="/imgs/marker_positive.png";

  for (let key in stations) {
    let station = stations[key];


    let markerText = "<strong>" + station.location + "</strong> <br>" + station.difference + " cm";

    // if (station.trend === 1) {
    //   marker_url = "C:\\Users\\tinta\\OneDrive\\Documents\\Web_development\\SeaLevels\\imgs\\marker_positive.png";
    // } else if (station.trend === -1) {
    //   marker_url = "imgs/marker_negative.png";
    // } else if (station.trend === 0) {
    //   marker_url = "imgs/marker_neutral.png";
    // }

    markers[station.location] = L.marker([station.latitude, station.longitude]);
    markers[station.location].addTo(earth);
    markers[station.location].bindPopup(markerText, {maxWidth: 150, closeButton: true});//.openPopup();
  }
  return markers
}

function changeText() {
  let old_content = markers["DE"].element.innerHTML;
  let rx = new RegExp("</strong>[\\d\\D]*?<\/div>", "g");
  let new_content = old_content.replace(rx, "</strong> <br> Hola!!! </div>");
  // console.log(new_content);
  // console.log(old_content);
  markers['DE'].element.innerHTML = new_content; // even replacing this with old_content makes the marker unresponsive...;
}

// $(document).ready(initialize);

// $(window).on('load', function() {
//   initialize();
// });

$.getScript("stations_data.js", function() {
  // console.log(stations["1"].location);
  initialize();
});
