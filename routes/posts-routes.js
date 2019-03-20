const express = require('express');

const router = express.Router()

const Db = require('../data/helpers/postDb') 


router.get('/', async (req, res) => {
    try {
        const users = await Db.get()
        res.status(200).json(users)
    } catch {
        res.status(500).json({message: "The posts information could not be retrieved."})
    }
})

router.get('/:id', async (req,res) => {
    const { id } = req.params
    try {
        const post = await Db.getById(id)
        if (!post) {
            res.status(404).json({ error: "That post does not exist" })
        } else {
            res.status(200).json(post)
        }
    } catch {
        res.status(500).json({ error: "There was an error in retrieving that post" })
    }
})

module.exports = router;