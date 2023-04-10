const express = require('express')
const router = express.Router()
const { ensureAuth } = require('../middleware/auth')

const Poem = require('../models/Poem')

// @desc    Show add page
// @route   GET /poems/add
router.get('/add', ensureAuth, (req, res) => {
    res.render('poems/add')
})

// @desc    Process add form
// @route   POST /poems/add
router.post('/', ensureAuth, async (req, res) => {
    try {
        req.body.user = req.user.id
        await Poem.create(req.body)
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// @desc    Show all poems
// @route   GET /poems
router.get('/', ensureAuth, async (req, res) => {
    try {
        const poems = await Poem.find({ status: 'public' })
            .populate('user')
            .sort({ createdAt: 'desc' })
            .lean()

        res.render('poems/index', {
            poems,
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

// @desc    Show single poem
// @route   GET /poems/:id
router.get('/:id', ensureAuth, async (req, res) => {
    try {
        let poem = await Poem.findById(req.params.id)
            .populate('user')
            .lean()

        if (!poem) {
            return res.render('error/404')
        }

        res.render('poems/show', {
            poem
        })
    } catch (err) {
        console.error(err)
        res.render('error/404')
    }
})

// @desc    Show edit page
// @route   GET /poems/edit/:id
router.get('/edit/:id', ensureAuth, async (req, res) => {
    try {
    const poem = await Poem.findOne({
        _id: req.params.id
    }).lean()

    if (!poem) {
        return res.render('error/404')
    }

    if (poem.user != req.user.id) {
        res.redirect('/poems')
    } else {
        res.render('poems/edit', {
            poem,
        })
    }
    } catch (err) {
        console.error(err)
        return res.render('/error/500')
    }
})

// @desc    Update poem
// @route   PUT /poems/:id
router.put('/:id', ensureAuth, async (req, res) => {
    try {
    let poem = await Poem.findById(req.params.id).lean()

    if (!poem) {
        return res.render('error/404')
    }

    if (poem.user != req.user.id) {
        res.redirect('/poems')
    } else {
        poem = await Poem.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
            runValidators: true
        })

        res.redirect('/dashboard')
    }
    } catch(err) {
        console.error(err)
        return res.render('/error/500')
    }
})

// @desc    Delete poem
// @route   DELETE /poems/:id
router.delete('/:id', ensureAuth, async (req, res) => {
    try {
        await Poem.remove({ _id: req.params.id })
        res.redirect('/dashboard')
    } catch (err) {
        console.error(err)
        return res.render('error/500')
    }
})

// @desc    User poems
// @route   GET /poems/user/:userId
router.get('/user/:userId', ensureAuth, async (req, res) => {
    try {
        const poems = await Poem.find({
            user: req.params.userId,
            status: 'public'
        })
        .populate('user')
        .lean()

        res.render('poems/index', {
            poems
        })
    } catch (err) {
        console.error(err)
        res.render('error/500')
    }
})

module.exports = router
