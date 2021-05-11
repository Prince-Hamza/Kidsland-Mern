const Event = require('../models/Events')
const Devicez = require('../models/Devices')
const State = require('../models/State')

const firebase = require('firebase')

Device = async (req, res) => {


    connect()


    let devId = req.url.split('/')[2]
    var db = firebase.firestore()
    var docRef = db.collection("devices").doc(devId).collection('events')
    var eventList = []

    docRef.get().then((doc) => {

        doc.forEach((ev) => {
            data = ev.data()
            data.Device = devId
            data.timeLocal = toDate(data.timeLocal)
            data.timeSync = toDate(data.timeSync)
            data.timeLocalOnly = data.timeLocal.toString().split(" ")[4]
            data.timeSyncOnly = data.timeLocal.toString().split(" ")[4]

            // Thu Apr 08 2021 12:32:32 GMT-0700 (Pacific Daylight Time)

            eventList.push(data)
        })



        //  const Info = new Devicez(data)

        Event.insertMany(eventList)
            .then(() => {
                console.log("successfully written")
                return res.json({
                    success: true,
                    message: 'Device created!',
                })
            })


    }).catch((error) => {
        console.log("Error getting document:", error);
    })


    //    return res.json({ success: true })

}

toDate = (timestamp) => {
    //    console.log(new Date(timestamp.seconds*1000))

    // return timestamp.toDate().toDateString()

    return new Date(timestamp.seconds * 1000)

}

connect = () => {
    try {
        const firebaseConfig = {
            apiKey: "AIzaSyCnD-xueHVA0gwNjBLUu5hlB8x8jhMMgOw",
            authDomain: "kidland-5754b.firebaseapp.com",
            databaseURL: "https://kidland-5754b-default-rtdb.firebaseio.com",
            projectId: "kidland-5754b",
            storageBucket: "kidland-5754b.appspot.com",
            messagingSenderId: "291891653552",
            appId: "1:291891653552:web:19a1a9a416f4201f0ac475"
        };

        try { firebase.initializeApp(firebaseConfig); } catch (ex) { console.log(''); }

        firebase.database().ref("/go").set({ success: true })

        console.log("connected to firebase")
    } catch (ex) {
        console.log(ex)
    }
}




createMovie = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a movie',
        })
    }

    const movie = new Movie(body)

    if (!movie) {
        return res.status(400).json({ success: false, error: err })
    }

    movie
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: movie._id,
                message: 'Movie created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Movie not created!',
            })
        })

    //return res.json({success:true})


}

updateMovie = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Movie.findOne({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Movie not found!',
            })
        }
        movie.name = body.name
        movie.time = body.time
        movie.rating = body.rating
        movie
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: movie._id,
                    message: 'Movie updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Movie not updated!',
                })
            })
    })
}

deleteMovie = async (req, res) => {
    await Movie.findOneAndDelete({ _id: req.params.id }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Movie not found` })
        }

        return res.status(200).json({ success: true, data: movie })
    }).catch(err => console.log(err))
}

getMovieById = async (req, res) => {
    // let p = window.location.href.split('/')[3]
    let devId = req.url.split('/')[2]

    await Devicez.findOne({ Device: devId }, (err, movie) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!movie) {
            return res
                .status(404)
                .json({ success: false, error: `Device not found` })
        }
        return res.status(200).json({ info: movie })
    }).catch(err => console.log(err))

}

getDeviceEvents = async (req, res) => {
    // let p = window.location.href.split('/')[3]
    let devId = req.url.split('/')[2]
    console.log(`requested event info for device: ${devId}`)

    await Event.find({ Device: devId }, (err, movies) => {
        return res.status(200).json({ data: movies })
    }).catch(err => console.log(err))

}


getMovies = async (req, res) => {
    await Devicez.find({ "Device": "cMeucuqYV2b" }, (err, movies) => {
        return res.status(200).json({ data: movies })
    }).catch(err => console.log(err))
}

getDevices = async (req, res) => {
    await Devicez.find({}, (err, movies) => {
        return res.status(200).json({ data: movies })
    }).catch(err => console.log(err))
}


module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovies,
    getMovieById,
    Device,
    getDevices,
    getDeviceEvents
}
