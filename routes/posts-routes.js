const express = require('express');

const router = express.Router()

router.use(express.json());

const Db = require('../data/helpers/postDb') 
const UsersDb = require('../data/helpers/userDb')

//gets all posts in db
router.get('/', async (req, res) => {
    try {
        const users = await Db.get()
        res.status(200).json(users)
    } catch {
        res.status(500).json({message: "The posts information could not be retrieved."})
    }
})


//gets post by post id
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

//add post to db by
// router.post('/:id', async (req, res) => {
//     const { id } = req.params
//     const post = req.body
//     try {
//         const usersPosts = await UsersDb.getUserPosts(id)
//         const id = usersPosts[-1].id + 1
//         const postedBy = usersPosts[-1].postedBy
//         post.id = id;
//         post.postedBy = postedBy;
//         usersPosts.push(post)
//         res.status(200).json(usersPosts)
//     } catch {
//         res.status(500).json({ error: "Failed retrieving users posts" })
//     }
// })




module.exports = router;