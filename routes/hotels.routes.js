const router = require("express").Router()
const isSignedIn = require('../middleware/is-signed-in')
const isAdmin = require('../middleware/is-admin')
const Hotel = require('../models/Hotel')

// Create routes

router.get('/new', isSignedIn, isAdmin, (req,res)=>{
    res.render('hotels/create-hotel.ejs')
})




module.exports = router
