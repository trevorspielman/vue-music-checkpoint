let express = require("express"),
  bp = require("body-parser"),
  cors = require("cors"),
  server = express(),
  
  port = 3000;

require("./server-assets/db/mlab-config");

let Playlists = require('./server-assets/routes/Playlists')

server.use(cors());
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));
server.use(Playlists)

//Your routes here


server.use("*", (error, req, res, next) => {
    res.status(400).send(error);
  });
  
server.listen(port, () => {
    console.log("the server is running... Port:", port);
  });