const express = require('express');
const Ngo = require('../models/Ngo');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchngo = require('../middleware/fetchngo')

const JWT_SECRET = 'Donationsforhelpingp$eople';

// ROUTE 1:  Create a User using: POST "/api/ngo/createuser". No login required
router.post('/createuser', [
    body('name', 'Name must be atleast 5 characters').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').exists(),
    body('registration', 'Registration number is required').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;
    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    // Check whether the user with the same email exists already
    try {
        let ngo = await Ngo.findOne({ email: req.body.email });
        if (ngo) {
            return res.status(400).json({ success, error: "Sorry a user with this email already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        ngo = await Ngo.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
            registration: req.body.registration,
        })

        const data = {
            ngo:{
                id: ngo.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);
        success = true;
        res.json({ success, authtoken});
        // Catch errors
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE 2: Authenticate a User using: POST "/api/ngo/login". No login required
router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
], async (req, res) => {
    let success = false;
    // if there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { email, password } = req.body;
    // Check whether the user with the same email exists already
    try {
        let ngo = await Ngo.findOne({ email });
        if (!ngo) {
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }
        
        const passwordCompare = await bcrypt.compare(password, ngo.password);
        if(!passwordCompare){
            return res.status(400).json({ success, error: "Please try to login with correct credentials" });
        }

        const data = {
            ngo:{
                id: ngo.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken});

        // Catch errors
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE3: Get loggedin User using: GET "/api/ngo/getngo". Login required
router.get('/getngo', fetchngo ,async (req,res)=>{
    try{
        ngoId = req.ngo.id;
        const ngo = await Ngo.findById(ngoId).select("-password");
        res.json(ngo);
        // res.send(user);
    }catch(error){
        console.log(error.mesage);
        res.status(500).send("Internal Server Error");
    }
})

// ROUTE4: Get loggedin User using: GET "/api/ngo/getngo". Login required
router.get('/getngos', async (req,res)=>{
    try{
        const ngo = await Ngo.find();
        res.json(ngo);
    }catch(error){
        console.log(error.mesage);
        res.status(500).send("Internal Server Error");
    }
})

module.exports = router;