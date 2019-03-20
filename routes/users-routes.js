const express = require('express');

const router = express.Router()

router.use(express.json());

const Db = require('../data/helpers/userDb') 

router.get('/', async (req, res) => {
    try {
        const users = await Db.get()
        res.status(200).json(users)
    } catch {
        res.status(500).json({error: "The user information could not be retrieved."})
    }
})

router.get('/:id', async (req,res) => {
    const { id } = req.params
    try {
        const user = await Db.getById(id)
        if (!user) {
            res.status(404).json({ error: "That user does not exist" })
        } else {
            res.status(200).json(user)
        }
    } catch {
        res.status(500).json({ error: "There was an error in retrieving that user" })
    }
})

router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const userToAdd = await Db.insert(req.body)
        res.status(200).json(userToAdd)
    } catch {
        res.status(500).json({ error: "Failed adding user" })
    }
})


module.exports = router;