// WebGL Earth implementation of Google Trends visualization
// Using country data by Gist
// TODO: Non-latin characters not recognized...
let country_codes = Object.keys(trendsData);
let markers;

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
  let earth = new WE.map('earth_div', options);
  // WE.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(earth);

  WE.tileLayer('https://webglearth.github.io/webglearth2-offline/{z}/{x}/{y}.jpg', {
    tileSize: 256,
    bounds: [[-85, -180], [85, 180]],
    minZoom: 0,
    maxZoom: 16,
    attribution: 'WebGLEarth example',
    tms: true
  }).addTo(earth);

  markers = setMapMarkers(earth, country_codes);
  //earth.setView([0, 0], 1);
  console.log(markers["DE"]);
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

function getCountryByCode(code) {
  return countries.filter(
      function(countries){
        return countries.country_code == code
       }
  )[0];
}

function setMapMarkers(earth, country_codes) {
  let markers = {};
  for (code of country_codes) {

    let markerText = "<strong>" + trendsData[code].name + "</strong> <br>" +
    JSON.stringify(trendsData[code].trends, null, 2).replace(/{/g, "").replace(/}/g, "").replace(/\"/g,"").replace(/,/g, "<br>");// </div>")

    let country = getCountryByCode(code);

    markers[code] = WE.marker(country.latlng).addTo(earth);
    markers[code].bindPopup(markerText, {maxWidth: 150, closeButton: true});//.openPopup();
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
  console.log(markers["DE"]);
}
