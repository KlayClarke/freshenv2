const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mbxToken = process.env.MBX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mbxToken });

async function findLocation(streetAddress, city, state, zipCode) {
  const salonFullAddress = `${streetAddress} ${city}, ${state} ${zipCode}`;
  const geoData = await geocoder
    .forwardGeocode({
      query: salonFullAddress,
      limit: 1,
    })
    .send()
    .then((response) => {
      return response;
    });
  const geoJSON = await JSON.parse(geoData.request.response.rawBody);
  const coordinates = geoJSON["features"][0]["geometry"];
  console.log(coordinates);
  return coordinates;
}

module.exports = {
  findLocation,
};
