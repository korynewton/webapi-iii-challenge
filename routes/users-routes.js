const express = require('express');

const router = express.Router()

const Db = require('../data/helpers/userDb') 

router.get('/', async (req, res) => {
    try {
        const users = await Db.get()
        res.status(200).json(users)
    } catch {
        res.status(500).json({message: "The search for users you had requested has failed"})
    }
})

module.exports = router;