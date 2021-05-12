
const express = require('express')
const MovieCtrl = require('../controller/movie-ctrl')
const router = express.Router()

router.get('/device/:id', MovieCtrl.Device)
router.post('/movie', MovieCtrl.createMovie)
router.put('/movie/:id', MovieCtrl.updateMovie)
router.delete('/movie/:id', MovieCtrl.deleteMovie)
router.get('/events', MovieCtrl.getMovies)
router.get('/devices', MovieCtrl.getDevices)
router.get('/getdeviceevents/:id', MovieCtrl.getDeviceEvents)
router.get('/getdeviceinfo/:id', MovieCtrl.getMovieById)

router.get('/newdevice/:id', MovieCtrl.newdevice)
router.get('/newevent/:id', MovieCtrl.newEvent)

module.exports = router
