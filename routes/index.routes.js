const router = require("express").Router()
const Hotel = require('../models/Hotel')


router.get('/', async (req,res)=>{
    const allHotels = await Hotel.find()
    res.render('homepage.ejs',{hotels: allHotels})
})
module.exports = router;
