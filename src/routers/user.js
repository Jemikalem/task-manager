const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendCancelationEmail } = require('../emails/account')
const router = new express.Router()

router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        sendWelcomeEmail(user.email, user.name)
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

    /* user.save().then(() => {
        res.status(201).send(user)
    }).catch((e) => {
        res.status(400).send(e)
    }) */

    /* console.log(req.body)
    res.send('testing!') */
})


//Logging in Users
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch(e) {
        res.status(400).send()
    }
})


router.post('/users/logout', auth, async (req, res) => {
    try {
        // Here, we are going to do is return true when token that we are currently looking at is not
        // the one that was used for the authentication
        req.user.tokens = req.user.tokens.filter((token) => {
            // if they are not equal we are going to return true, keeping it in the tokens array
            // if they are equal it will end up returning false filtering it out and removing it
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch(e) {
        res.status(500).send()
    }
})

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})

/* router.get('/users', auth, async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch(e) {
        res.status(500).send()
    }

//    User.find({}).then((users) => {
//        res.send(users)
//    }).catch((e) => {
//        res.status(500).send()
//    })
}) */

/* //express provides dynamic parameter to route 
router.get('/users/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch(e) {
        res.status(500).send()
    }

//    User.findById(_id).then((user) => {
//        if (!user) {
//            return res.status(404).send()
//        }
//        
//        res.send(user)
//    }).catch((e) => {
//        res.status(500).send()
//    })
}) */


router.patch('/users/me', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    // if we have 9 true and 1 false, every will return false
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
//         const user = await User.findById(req.params.id)
        
        updates.forEach((update) => req.user[update] = req.body[update])
        await req.user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

//        if (!user) {
//            return res.status(404).send()
//        }

        res.send(req.user)
    } catch(e) {
        res.status(400).send(e)
    }
})

/* router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    // if we have 9 true and 1 false, every will return false
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const user = await User.findById(req.params.id)
        
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        // const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch(e) {
        res.status(400).send(e)
    }
}) */

router.delete('/users/me', auth, async (req, res) => {
    try {
//        const user = await User.findByIdAndDelete(req.user._id)
//
//        if (!user) {
//            return res.status(404).send()
//        }

        // removing my user should remove all my tasks, for this we have
        // coded a middleware in the ./modes/user for the remove() method
        await req.user.remove()
        sendCancelationEmail(req.user.email, req.user.name)
        res.send(req.user)
    } catch(e) {
        res.status(500).send(e)
    }
})

/* 
router.delete('/users/:id', auth, async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()
        }

        res.send(user)
    } catch(e) {
        res.status(500).send(e)
    }
})
 */

module.exports = router