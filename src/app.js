const path = require("path");
const express = require("express");
// const nodemon = require("nodemon");
const { engine } = require("express-handlebars");
const { title } = require("process");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const { error } = require("console");

const app = express();
const port = process.env.PORT || 3000;

//Define Paths for Express Config
const publicDirectoryPath = path.join(__dirname, "../views");
// const viewsPath = path.join(__dirname, "../templates//views"); //if we want to change the name of view folder and giving new folder name

//Setup handlebars engine and views location
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
//app.set("views", viewsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));
app.use(express.static(path.join(__dirname, "../public")));

// app.set("views", path.join(__dirname + "/../views"));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Rana Ali Raza",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Rana Ali Raza",
    src1: "/img/me.jpeg",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    helptext: "This is some helpful text",
    title: "Help Class",
    name: "Rana Ali Raza",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitutde, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitutde, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

//WildCard End Port (mean someone enter something more than actual link)
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rana Ali Raza",
    errorMessage: "Help Article not found",
  });
});

//General Page if someone enter wrong endport
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rana Ali Raza",
    errorMessage: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// process.env.node_env;
