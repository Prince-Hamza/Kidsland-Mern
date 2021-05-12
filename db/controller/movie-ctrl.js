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

    // await Event.find({ Device: devId }, (err, movies) => {

    //     if (err) {
    //         return res.status(400).json({ success: false, error: err })
    //     }

    //     return res.status(200).json({ data: movies })
    // }).catch(err => console.log(err))

    await Event.find({ Device: devId }).limit(600).exec((err, info) => {

        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ data: info })


    })


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




newdevice = async (req, res) => {

    // @example : /api/newdevice/name=name&isbusy=isbusy&rssidb=55&moneyreset=0&admin=humzi_merry 

    const Param = req.url.split('/')[2]
    var Headings = Param.split('&')
    var Jsn = ({ name: "", isBusy: "", rssiDB: "", moneyReset: "", admins: [] })
    var localdate = '', localtime = '', syncdate, synctime;

    if (!contains(Headings, 'name=')) return res.send('Missing Device Name')
    if (!contains(Headings, 'localdate=')) return res.send('Missing local Date')
    if (!contains(Headings, 'localtime=')) return res.send('Missing local Time')
    if (!contains(Headings, 'syncdate=')) return res.send('Missing Sync Date')
    if (!contains(Headings, 'synctime=')) return res.send('Missing Sync Time')


    Headings.forEach((string) => {
        if (string.split('=')[0] === 'name') Jsn.name = string.split('=')[1]
        if (string.split('=')[0] === 'isbusy') Jsn.isBusy = string.split('=')[1]
        if (string.split('=')[0] === 'rssidb') Jsn.rssiDB = string.split('=')[1]
        if (string.split('=')[0] === 'moneyreset') Jsn.moneyReset = string.split('=')[1]
        if (string.split('=')[0] === 'admins') {
            var arr = string.split('=')[1].split('_')
            Jsn.admins = arr
        }
        if (string.split('=')[0] === 'localdate') { localdate = string.split('=')[1] }
        if (string.split('=')[0] === 'localtime') { localtime = string.split('=')[1] }
        if (string.split('=')[0] === 'syncdate') { syncdate = string.split('=')[1] }
        if (string.split('=')[0] === 'synctime') { synctime = string.split('=')[1] }


    })


    let syncdateTime = syncdate + 'T' + synctime
    let localdateTime = localdate + 'T' + localtime

    console.log(new Date(localdateTime))
    console.log(new Date(syncdateTime))


    if (!new Date(localdateTime)) return res.send('Date or Time is Invalid')
    if (!new Date(syncdateTime)) return res.send('Date or Time is Invalid')


    var lastEvent = { timeLocal: localdateTime, timeSync: syncdateTime }
    Jsn.lastEvent = lastEvent
    // yyyy-mm-dd

    const device = new Devicez(Jsn)

    device.save().then(() => {
        return res.status(201).send('Successfully Written: ' + JSON.stringify(Jsn))
    })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Device not created!',
            })
        })



}

contains = (Headings, param) => {
    var search = false
    Headings.forEach((string) => { if (string.includes(param)) { search = true } })
    return search
}


newEvent = async (req, res) => {
    const Param = req.url.split('/')[2]
    var Headings = Param.split('&')
    var Jsn = ({ amount:1 , Device:'' })
    var localdate = '', localtime = '', syncdate, synctime;

    if (!contains(Headings, 'amount=')) return res.send('Missing Device Name')
    if (!contains(Headings, 'type=')) return res.send('Missing Device Name')
    if (!contains(Headings, 'localdate=')) return res.send('Missing local Date')
    if (!contains(Headings, 'localtime=')) return res.send('Missing local Time')
    if (!contains(Headings, 'syncdate=')) return res.send('Missing Sync Date')
    if (!contains(Headings, 'synctime=')) return res.send('Missing Sync Time')
    if (!contains(Headings, 'device=')) return res.send('Missing Device Id')



    Headings.forEach((string) => {
        if (string.split('=')[0] === 'amount') Jsn.amount = string.split('=')[1]
        if (string.split('=')[0] === 'type') Jsn.type = string.split('=')[1]
        if (string.split('=')[0] === 'device') Jsn.Device = string.split('=')[1]


        if (string.split('=')[0] === 'localdate') { localdate = string.split('=')[1] }
        if (string.split('=')[0] === 'localtime') { localtime = string.split('=')[1] }
        if (string.split('=')[0] === 'syncdate') { syncdate = string.split('=')[1] }
        if (string.split('=')[0] === 'synctime') { synctime = string.split('=')[1] }


    })


    let syncdateTime = syncdate + 'T' + synctime
    let localdateTime = localdate + 'T' + localtime

    console.log(new Date(localdateTime))
    console.log(new Date(syncdateTime))


    if (!new Date(localdateTime)) return res.send('Date or Time is Invalid')
    if (!new Date(syncdateTime)) return res.send('Date or Time is Invalid')



    Jsn.timeLocal = localdateTime
    Jsn.timeSync = syncdateTime

    const event = new Event(Jsn)

    event.save().then(() => {
        return res.status(201).send('Successfully Written: ' + JSON.stringify(Jsn))
    })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Event not created!',
            })
        })



}



module.exports = {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovies,
    getMovieById,
    Device,
    getDevices,
    getDeviceEvents,
    newdevice,
    newEvent
}
