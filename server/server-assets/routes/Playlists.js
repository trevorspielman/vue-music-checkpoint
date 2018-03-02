var router = require('express').Router()
var Playlists = require('../models/playlist')
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
      .then(Watchlist => {
          if (!Watchlist){
              return res.status(400).send({error: "Invalid Id"})
          }
          return res.send(Watchlist)
      })
      .catch(next)
})

router.put('/api/playlists/:id', (req, res, next) => {
    Playlists.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(Watchlist => {
            res.send(Watchlist)
        })
        .catch(next)
})

router.delete('/api/playlists/:id', (req, res, next) => {
    Playlists.findByIdAndRemove(req.params.id)
        .then(Watchlist => {
            res.send({message: "Watchlist go Burn"})
        })
        .catch(next)
})

module.exports = router