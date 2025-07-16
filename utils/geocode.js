const axios = require("axios");

module.exports = async function geocodeLocation(location) {
  try {
    const response = await axios.get(
      "https://api.maptiler.com/geocoding/" +
        encodeURIComponent(location) +
        ".json",
      {
        params: {
          key: process.env.MAP_TOKEN,
        },
      }
    );
    const feature = response.data.features[0];
    if (!feature) return null;

    return feature.geometry;
  } catch (err) {
    console.error("Geocoding error:", err);
    return null;
  }
};
