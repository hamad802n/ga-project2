const router = require("express").Router()
const Hotel = require('../models/Hotel')


router.get('/', async (req,res)=>{
    const selectedCountry = req.query.country

    let filter = {}
    if(selectedCountry){
        filter = {country: selectedCountry}
    }

    const allHotels = await Hotel.find(filter)
    const allCountries = await Hotel.distinct('country')
    res.render('homepage.ejs',{hotels: allHotels, countries: allCountries, selectedCountry: selectedCountry})
})
module.exports = router;
