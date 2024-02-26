const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Accept = require('../models/Accept');
const { body, validationResult } = require('express-validator');
const fetchngo = require('../middleware/fetchngo')
const Detail = require('../models/Details');
// const Ngo = require('../models/Ngo');

// ROUTE 1:  Get All the Details using: GET "/api/status/getuser". login required
router.get('/statusdetails', fetchuser, async (req, res) => {
    try {
        const details = await Detail.find({ user: req.user.id });
        res.json(details);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    } 
})

// ROUTE 2:  Add a new Detail using: PUT "/api/status/addstatus". login required
router.put('/addstatus/:id', fetchngo, [
    body('status', 'Status must be there').exists(),
], async (req, res) => {
    try {
        const { status } = req.body;
        // const ngoId = req.ngo.id;
        // const ngo_name =  Ngo.findById(ngoId).select("name");
        // res.json(ngo);
        // const obj=JSON.parse(ngo_name);
        // res.json(obj);
        const newNote={};
        if(status){newNote.status=status};
        // if(ngo_name){newNote.ngo_name= req.ngo.name};
        {newNote.ngo= req.ngo.id};
        let note = await Detail.findById(req.params.id);
        if (!note) { return res.status(404).send("Not found") }

        // if (note.user.toString() !== req.user.id) {
        //     return res.status(401).send("Not Allowed");
        // }

        note = await Detail.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.json({ note });
        // res.json(note); // This is also true
    } catch (error) {
        console.log(error.mesage);
        res.status(500).send("Internal Server Error");
    }
    //     // if there are errors, return Bad request and the errors
    //     const errors = validationResult(req);
    //     if (!errors.isEmpty()) {
    //         return res.status(400).json({ errors: errors.array() });
    //     }
    //     const acc = new Accept({
    //         status, ngo: req.ngo.id
    //         // status
    //     })
    //     const savedDetail = await acc.save();
    //     res.json(savedDetail);

    // } catch (error) {
    //     console.error(error.message);
    //     res.status(500).send("Internal Server Error");
    // }
})

// // ROUTE 2:  Add a new Detail using: PUT "/api/status/addstatus". login required
// router.put('/addstatus/:id', fetchngo, [
//     body('status', 'Status must be there').exists(),
// ],  (req, res) => {
//     try {
//         const { status } = req.body;
//         // ngoId = req.ngo.id;
//         // const ngo_name =  Ngo.findById(ngoId).select("name");
//         // const obj=JSON.parse(ngo_name);
//         // res.json(obj.name);
//         const newNote={};
//         if(status){newNote.status=status};
//         // if(ngo_name){newNote.ngo_name= "Ayush"};
//         {newNote.ngo= req.ngo.id};

//         let note =  Detail.findById(req.params.id);
//         if (!note) { return res.status(404).send("Not found") }

//         // if (note.user.toString() !== req.user.id) {
//         //     return res.status(401).send("Not Allowed");
//         // }

//         note = Detail.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
//         res.json({ note });
//         // res.json(note); // This is also true
//     } catch (error) {
//         console.log(error);
//         res.status(500).send("Internal Server Error");
//     }
//     //     // if there are errors, return Bad request and the errors
//     //     const errors = validationResult(req);
//     //     if (!errors.isEmpty()) {
//     //         return res.status(400).json({ errors: errors.array() });
//     //     }
//     //     const acc = new Accept({
//     //         status, ngo: req.ngo.id
//     //         // status
//     //     })
//     //     const savedDetail = await acc.save();
//     //     res.json(savedDetail);

//     // } catch (error) {
//     //     console.error(error.message);
//     //     res.status(500).send("Internal Server Error");
//     // }
// })

// ROUTE 3:  Add a new Detail using: POST "/api/status/addstatus". login required
// router.post('/addstatuss/:id', fetchngo, [
//     body('status', 'Status must be there').exists(),
// ], async (req, res) => {
//     try {
//         const { status } = req.body;
//         // if there are errors, return Bad request and the errors
//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             return res.status(400).json({ errors: errors.array() });
//         }
//         const acc = new Accept({
//             status, ngo: req.ngo.id, _id:"641925f9d20df1dc767d3438"
//             // status
//         })
//         const savedDetail = await acc.save();
//         res.json(savedDetail);

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send("Internal Server Error");
//     }
// })

module.exports = router;