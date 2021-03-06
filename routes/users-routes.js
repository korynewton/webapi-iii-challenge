const express = require('express');

const router = express.Router()

router.use(express.json());

const Db = require('../data/helpers/userDb') 

//middleware:
function capitalizeName(req, res, next) {
    if (!req.body.name) {
        next();
    } else {
     req.body.name = req.body.name.toUpperCase();
     next();
    }
}

router.use(capitalizeName)

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

router.post('/', capitalizeName, async (req, res) => {
    try {
        const userToAdd = await Db.insert(req.body)
        res.status(200).json(userToAdd)
    } catch {
        res.status(500).json({ error: "Failed adding user" })
    }
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    try {
        const remove = await Db.remove(id)
        if (!remove) {
            res.status(404).json({ error : "User not found" })
        } else {
            res.status(200).json({ message: "user deleted" })
        }
    } catch {
        res.status(500).json({ error: "error in deleting User" })
    }
})

router.put('/:id', capitalizeName, async (req, res) => {
    const { id } = req.params;
    const edits = req.body
    try {
        const updated = await Db.update(id, edits);
        if (!updated) {
            res.status(404).json({ error: "user not found" })
        } else {
            const updates = await Db.getById(id)
            res.status(200).json(updates)
        }
    } catch {
        res.status(500).json({ error: "Error in updating" })
    }
})

router.get('/usersPosts/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const posts = await Db.getUserPosts(id)
        if (!posts) {
            res.status(404).json({ error: "this user has no posts" })
        } else {
            res.status(200).json(posts)
        }
    } catch {
        res.status(500).json({ error: "error in retrieving posts from user" })
    }
})


module.exports = router;