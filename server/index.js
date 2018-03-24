let express = require("express"),
  bp = require("body-parser"),
  cors = require("cors"),
  server = express(),
  port = process.env.PORT || 3000

require("./db/mlab-config");

let Playlists = require('./routes/Playlists')
let Songs = require('./routes/Songs')

var whitelist = ['http://localhost:8080', 'https://vue-music-trevor.herokuapp.com/']
var corsOptions = {
    origin: function (origin, callback) {
        var originIsWhitelisted = whitelist.indexOf(origin) !== -1
        callback(null, originIsWhitelisted)
    },
    credentials: true
};

server.use(cors(corsOptions));
server.use(bp.json());
server.use(bp.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/../public/dist"))
server.use(Playlists)
server.use(Songs)

//Your routes here


server.use("*", (error, req, res, next) => {
    res.status(400).send(error);
  });
  
server.listen(port, () => {
    console.log("the server is running... Port:", port);
  });