const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in')
const Booking = require('../models/Booking')
const Hotel = require('../models/Hotel')


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


router.get('/:bookingId', isSignedIn, async (req,res)=>{
    const foundBooking = await Booking.findById(req.params.bookingId).populate('hotel')
    if(!foundBooking || !foundBooking.user.equals(req.session.user._id)){
        return res.send('Booking not found')
    }
    res.render('bookings/details.ejs', {booking: foundBooking})
})



router.get('/:bookingId/edit', isSignedIn, async (req,res)=>{
    const foundBooking = await Booking.findById(req.params.bookingId)
    if(!foundBooking || !foundBooking.user.equals(req.session.user._id)){
        return res.send('Booking not found')
    }
    const allHotels = await Hotel.find()
    res.render('bookings/edit-booking.ejs', {booking: foundBooking, hotels: allHotels})
})


router.put('/:bookingId', isSignedIn, async (req,res)=>{
    const foundBooking = await Booking.findById(req.params.bookingId)
    if(!foundBooking || !foundBooking.user.equals(req.session.user._id)){
        return res.send('Action not allowed')
    }

    const {hotel, checkIn, checkOut, guests, rooms} = req.body
    const foundHotel = await Hotel.findById(hotel)

    const totalPrice = foundHotel.pricePerNight * rooms * ((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24))

    await Booking.findByIdAndUpdate(req.params.bookingId, {
        hotel: hotel,
        checkIn: checkIn,
        checkOut: checkOut,
        guests: guests,
        rooms: rooms,
        totalPrice: totalPrice
    }, {runValidators: true})
    res.redirect('/bookings/' + req.params.bookingId)
})



router.delete('/:bookingId', isSignedIn, async (req,res)=>{
    const foundBooking = await Booking.findById(req.params.bookingId)
    if(!foundBooking || !foundBooking.user.equals(req.session.user._id)){
        return res.send('Action not allowed')
    }
    await Booking.findByIdAndDelete(req.params.bookingId)
    res.redirect('/bookings')
})


module.exports = router
