var router = require('express').Router()
var Playlists = require('../models/playlist')
var Songs = require('../models/song')
//Playlists

//Get Routes
router.get('/api/playlists', (req, res, next) => {
    Playlists.find(req.query)
        .then(Playlists => {
            res.send(Playlists)
        })
        .catch(next)
})
router.get('/api/playlists/:id', (req, res, next) => {
    Playlists.findById(req.params.id)
        .then(Playlist => {
            if (!Playlist) {
                return res.status(400).send({ error: "Invalid Id" })
            }
            return res.send(Playlist)
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

//Post Routes

//Create a playlist
router.post('/api/playlists', (req, res, next) => {
    Playlists.create(req.body)
        .then(Playlists => {
            res.send(Playlists)
        })
        .catch(next)
})

//Add a song to a playlists.song array
router.post('/api/playlists/:id', (req, res, next) => {
    Playlists.findById(req.params.id)
    .then(playlist => {
            playlist.songs.set(playlist.songs.length, req.body)
            playlist.markModified('songs')
            playlist.save()
            res.send(playlist)
        })
        .catch(next)
})

//Add a song to a playlist
router.post('/api/playlists/:id/songs', (req, res, next) => {
    Songs.create(req.body)
        .then(songs => {
            res.send(songs)
        })
        .catch(next)
})

//Put Routes
router.put('/api/playlists/:id', (req, res, next) => {
    Playlists.findById(req.params.id)
        .then(playlist => {
            for (var i = 0; i < playlist.songs.length; i++) {
                if(playlist.songs[i]._id == req.body._id){
                    playlist.songs.splice(i, 1)
                    playlist.markModified('songs')
                    playlist.save()
                    break;
                }
            }
            res.send(playlist)
        })
        .catch(next)
})


//Delete Routes
router.delete('/api/playlists/:id', (req, res, next) => {
    Playlists.findByIdAndRemove(req.params.id)
        .then(Playlist => {
            res.send({ message: "Playlist go Burn" })
        })
        .catch(next)
})

router.delete('/api/playlists/:id/songs/:songid', (req, res, next) => {
    Songs.findOneAndRemove({ playlistId: req.params.id, _id: req.params.songid })
        .then(song => {
            res.send(song)
        })
        .catch(next)
})


module.exports = router