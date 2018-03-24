var router = require('express').Router()
var Songs = require('../models/song')
//Songs

router.get('/api/songs', (req, res, next) => {
    Songs.find(req.query)
        .then(Songs => {
            res.send(Songs)
        })
        .catch(next)
})

router.post('/api/songs', (req, res, next) => {
    Songs.create(req.body)
        .then(Songs => {
            res.send(Songs)
        })
        .catch(next)
})

router.get('/api/songs/:id', (req, res, next) => {
  Songs.findById(req.params.id)
      .then(Song => {
          if (!Song){
              return res.status(400).send({error: "Invalid Id"})
          }
          return res.send(Song)
      })
      .catch(next)
})

router.put('/api/songs/:id', (req, res, next) => {
    Songs.findByIdAndUpdate(req.params.id, req.body, {new: true})
        .then(Song => {
            res.send(Song)
        })
        .catch(next)
})

router.delete('/api/songs/:id', (req, res, next) => {
    Songs.findByIdAndRemove(req.params.id)
        .then(Song => {
            res.send({message: "Song go Burn"})
        })
        .catch(next)
})

module.exports = router