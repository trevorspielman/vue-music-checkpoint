var router = require('express').Router()
var Playlists = require('../models/playlist')
var Songs = require('../models/song')
//Playlists

router.get('/api/playlists', (req, res, next) => {
    Playlists.find(req.query)
        .then(Playlists => {
            res.send(Playlists)
        })
        .catch(next)
})

router.post('/api/playlists', (req, res, next) => {
    Playlists.create(req.body)
        .then(Playlists => {
            res.send(Playlists)
        })
        .catch(next)
})

router.get('/api/playlists/:id', (req, res, next) => {
  Playlists.findById(req.params.id)
      .then(Playlist => {
          if (!Playlist){
              return res.status(400).send({error: "Invalid Id"})
          }
          return res.send(Playlist)
      })
      .catch(next)
})

router.put('/api/playlists/:id', (req, res, next) => {
    Playlists.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(Playlist => {
            res.send(Playlist)
        })
        .catch(next)
})

router.delete('/api/playlists/:id', (req, res, next) => {
    Playlists.findByIdAndRemove(req.params.id)
        .then(Playlist => {
            res.send({message: "Playlist go Burn"})
        })
        .catch(next)
})

//Gives us all songs associated with one playlist
router.get('/api/playlists/:id/songs', (req, res, next) => {
    Songs.find({ playlistId: req.params.id })
        .then(songs => {
            res.send(songs)
        })
        .catch(next)
})

//Gives us one song associated with one playlist
router.get('/api/playlists/:id/songs/:songid', (req, res, next) => {
    Songs.find({ playlistId: req.params.id, _id: req.params.songid })
        .then(song => {
            res.send(song)
        })
        .catch(next)
})

//Gives us one song associated with one playlist
router.delete('/api/playlists/:id/songs/:songid', (req, res, next) => {
    Songs.findOneAndRemove({ playlistId: req.params.id, _id: req.params.songid })
        .then(song => {
            res.send(song)
        })
        .catch(next)
})
module.exports = router