const router = require("express").Router()
const Hotel = require('../models/Hotel')


router.get('/', async (req,res)=>{
    const selectedCountry = req.query.country
    console.log('selectedCountry', selectedCountry)

    const allHotels = await Hotel.find()
    const allCountries = await Hotel.distinct('country')
    res.render('homepage.ejs',{hotels: allHotels, countries: allCountries, selectedCountry: selectedCountry})
})
module.exports = router;
