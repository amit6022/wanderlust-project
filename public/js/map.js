maptilersdk.config.apiKey = mapToken;

const map = new maptilersdk.Map({
  container: "map", // container ID
  style: maptilersdk.MapStyle.STREETS,
  center: listing.geometry.coordinates, // starting position [lng,lat]
  zoom: 9, //starting zoom
});

const marker = new maptilersdk.Marker({ color: "red" })
  .setLngLat(listing.geometry.coordinates) //Listing.geometry.coordinates
  .setPopup(
    new maptilersdk.Popup({ offset: 25 }).setHTML(
      `<h3>${listing.location}</h3><p>Exact location will be provided after booking</p>`
    )
  )
  .addTo(map);
