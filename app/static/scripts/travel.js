// Loader to create SVG path for the orbs to travel along
window.onload = () => {
  const reductionRatio = 100;
  const map = $('#map');
  const mapHeight = map.height() - reductionRatio;
  const mapWidth = map.width() - reductionRatio;

  $('.orb').css('offsetPath', `path("M ${reductionRatio},${reductionRatio} L ${mapWidth}, ${reductionRatio} L ${mapWidth},${mapHeight} L ${reductionRatio},${mapHeight} Z")`);


  setTimeout(() => {
    $('.blue-orb').css('animationPlayState', 'running');
    $('.blue-orb').css('animationDelay', '-6s');
    $('.blue-orb.top-orb').css('animationPlayState', 'running');
    $('.blue-orb.top-orb').css('animationDelay', '-10s !important');
    $('.purple-orb').css('animationPlayState', 'running');
    $('.purple-orb').css('animationDelay', '-6s !important');
  }, 3000);
};

function loadMap(token) {
  // set the token given by Mapbox
  mapboxgl.accessToken = token;

  // Edit this list according to the places you visited
  const visitedPlaces = [
    {
      latitude: 37.7829,
      longitude: -122.4190,
      label: "Travel place 1",
      tooltip: `I visited San Francisco in 2019`
    },
    {
      latitude: 37.7829,
      longitude: 115.4190,
      label: "Travel place 2",
      tooltip: `I visited San Francisco in 2019`
    },
    {
      latitude: 17.7829,
      longitude: 30.4190,
      label: "Travel place 3",
      tooltip: `I visited San Francisco in 2019`
    },
    {
      latitude: 30.7829,
      longitude: -105.4190,
      label: "Travel place 4",
      tooltip: `I visited San Francisco in 2019`
    }
  ]
  
  Mapkick.options = {
    style:'mapbox://styles/mapbox/navigation-night-v1', 
    zoom: 0.8, 
    center: [0, 40],
    tooltips: {html: true, hover: false},
    markers: {color: "#f84d4d"},
    label: {color: "#f84d4d"},
    textColor: "#f84d4d"
  };

  new Mapkick.Map("map", visitedPlaces);
}