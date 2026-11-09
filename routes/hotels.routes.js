const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in')
const isAdmin = require('../middleware/is-admin')
const Hotel = require('../models/Hotel')


router.get('/new', isSignedIn, isAdmin, (req,res)=>{
    res.render('hotels/create-hotel.ejs')
})


router.post('/', isSignedIn, isAdmin, async (req,res)=>{
    const {name, city, country, address, description, image, pricePerNight, rating, amenities} = req.body 
    const createdHotel = await Hotel.create({
        name: name,
        city: city,
        country: country,
        address: address,
        description: description,
        image: image,
        pricePerNight: pricePerNight,
        rating: rating,
        amenities: amenities,
        owner: req.session.user._id
    })
    res.redirect('/')
})


router.get('/:hotelId/edit', isSignedIn, isAdmin, async (req,res)=>{
    const foundHotel = await Hotel.findById(req.params.hotelId)
    if(!foundHotel){
        return res.send('Hotel not found')
    }
    res.render('hotels/edit-hotel.ejs', {hotel: foundHotel})
})


router.put('/:hotelId', isSignedIn, isAdmin, async (req,res)=>{
    const {name, city, country, address, description, image, pricePerNight, rating, amenities} = req.body
    await Hotel.findByIdAndUpdate(req.params.hotelId, {
        name: name,
        city: city,
        country: country,
        address: address,
        description: description,
        image: image,
        pricePerNight: pricePerNight,
        rating: rating,
        amenities: amenities || []
    }, {runValidators: true})
    res.redirect('/')
})


module.exports = router
