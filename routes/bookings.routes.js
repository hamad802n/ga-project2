const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in')
const Booking = require('../models/Booking')
const Hotel = require('../models/Hotel')

// Create routes

router.get('/new', isSignedIn, async (req,res)=>{
    const allHotels = await Hotel.find()
    res.render('bookings/new-booking.ejs', {hotels: allHotels})
})


router.post('/', isSignedIn, async (req,res)=>{
    const {hotel, checkIn, checkOut, guests, rooms} = req.body 
    
    
    
    const foundHotel = await Hotel.findById(hotel)
    console.log('foundHotel', foundHotel)

    const totalPrice = foundHotel.pricePerNight * rooms * ((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))
    console.log('totalPrice', totalPrice)    

    const createdBooking = await Booking.create({
        user: req.session.user._id,
        hotel: hotel,
        checkIn: checkIn,
        checkOut: checkOut,
        guests: guests,
        rooms: rooms,
        totalPrice: totalPrice
    })
    res.redirect('/bookings')
})




router.get('/', isSignedIn, async (req,res)=>{
    const myBookings = await Booking.find({user: req.session.user._id}).populate('hotel')
    res.render('bookings/index.ejs', {bookings: myBookings})
})


module.exports = router
