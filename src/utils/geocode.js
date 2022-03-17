const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoicmFuYWFsaXJhemEiLCJhIjoiY2wwZ3A3NWthMDBzaTNrcXI5Nzh3aTJvZiJ9.mu17UgyIz688yo5DBklZqg&limit=1";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to location services!", undefined);
    } else if (body.features.length === 0) {
      callback(
        "Unable to connect to find location. Try another search",
        undefined
      );
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitutde: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
