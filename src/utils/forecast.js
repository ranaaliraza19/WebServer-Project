const request = require("request");

const forecast = (latitude, longitutde, callback) => {
  //
  //calling the API
  const url =
    "http://api.weatherstack.com/current?access_key=6494ca6125b0b05d5c9743b715d5c070&query=" +
    // // Above is the URL of API which  we have created
    latitude +
    "," +
    longitutde;
  //+"&units=f"(after longitutde to convert the unit into farhenit)
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather services!", undefined);
    } else if (body.error) {
      callback("Unable to find location.", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions +
          ", It is currently " +
          body.current.temperature +
          " Degree out. And It feels like " +
          body.current.feelslike +
          " Degree out"
      );
    }
  });
};

module.exports = forecast;
