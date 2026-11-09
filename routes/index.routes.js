const router = require("express").Router()
const Hotel = require('../models/Hotel')


router.get('/', async (req,res)=>{
    const allHotels = await Hotel.find()
    const allCountries = await Hotel.distinct('country')
    res.render('homepage.ejs',{hotels: allHotels, countries: allCountries})
})
module.exports = router;
