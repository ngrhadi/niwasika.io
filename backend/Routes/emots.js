const router = require("express").Router();
const Emot = require("../Models/Emot");

// create emot
router.post("/", async(req, res) => {
    const newEmot = new Emot(req.body)
    try {
        const savedEmot = await newEmot.save();
        res.status(200).json(savedEmot)
    } catch (err) {
        res.status(500).json(err)
    }
});

router.get("/", async(req, res) => {
    try {
        const Emots = await Emot.find();
        res.status(200).json(Emots);
    } catch (err) {
        res.status(500).json(err)
    }
});

module.exports = router

// get all emot
