const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require('body-parser');
const app = express();
const HTTP_PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors());

const manager = require("./manager.js");
const m = manager();

// app.use(express.static(__dirname + '/static'));

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "/index.html"));
});

app.get("/api", (req, res) => {
    const links = [];
    links.push({ "rel": "collection", "href": "/api/cars", "methods": "GET,POST" });
    const linkObject = { 
      "apiName": "Web API example version 7",
      "apiDescription": "week 2 testing",
      "apiVersion": "1.0", 
      "apiAuthor": "Manan Patel",
      "links": links
    };
    res.json(linkObj);
    });

// Get all
app.get("/api/cars", (req, res) => {
    m.carsGetAll()
    .then((data) => {
    res.json(data);
    })
    .catch((error) => {
    res.status(500).json({ "message": error });
    })
});

// // Get one
app.get("/api/cars/:carId", (req, res) => {
  let id = req.params.carId;
  m.carGetById(id)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found ok" });
    })
});


// Add new
app.post("/api/cars", (req, res) => {
  m.carAdd(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      res.status(500).json({ "message": error });
    })
});

// Edit existing
app.put("/api/cars/:id", (req, res) => {
  m.carEdit(req.body)
    .then((data) => {
      res.json(data);
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Delete item
app.delete("/api/cars/:id", (req, res) => {
  m.carDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch(() => {
      res.status(404).json({ "message": "Resource not found" });
    })
});

// Resource not found (this should be at the end)
app.use((req, res) => {
  res.status(404).send("Resource not found");
});

// Tell the app to start listening for requests
m.connect().then(() => {
  app.listen(HTTP_PORT, () => { console.log("Ready to handle requests on port " + HTTP_PORT) });
})
  .catch((err) => {
    console.log("Unable to start the server:\n" + err);
    process.exit();
  });