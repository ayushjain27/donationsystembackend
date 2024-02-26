const express = require('express');
const router = express.Router();
const fetchngo = require('../middleware/fetchngo');
const Ngoinfo = require('../models/Ngoinfo');
const { body, validationResult } = require('express-validator');

// ROUTE 1:  Get All the Details using: GET "/api/ngoinfo/fetchallinfo". login required
router.get('/fetchallinfo', fetchngo, async (req, res) => {
    try {
        const ngoinformation = await Ngoinfo.find({ ngo: req.ngo.id });
        res.json(ngoinformation);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    } 
})

// ROUTE 2:  Add a new Detail using: POST "/api/ngoinfo/info". login required
router.post('/info', fetchngo, [
    body('name', 'Title must be atleast 5 characters').isLength({ min: 2 }),
    body('description', 'Description must be atleast 10 characters').isLength({ min: 10 }),
    body('address', 'Address must be atleast 2 characters').isLength({ min: 10 }),
    body('number', 'Phone number must be atleast 10 numbers').isLength({ min: 10 }),
    body('email', 'Phone number must be atleast 10 numbers').isEmail(),
], async (req, res) => {
    let success = false;
    try {
        const { name, email, address, description, image, number, dor, instagram } = req.body;
        const ngoinfo = new Ngoinfo({
            name, email, address, description, image, number, dor, instagram, ngo: req.ngo.id
        })
        const savedDetail = await ngoinfo.save();
        success = true;
        res.json({ success, savedDetail });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;