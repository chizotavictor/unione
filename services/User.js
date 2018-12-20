const config = require('../config.json')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const db = require('../models')
const User = require('../models/User')

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
}

async function authenticate({ email, password }) {
    const user = await User.findOne({ email })
    if (user && bcrypt.compareSync(password, user.passwordHash)) {
        const { hash, ...userWithoutHash } = user.toObject()
        const token = jwt.sign({ sub: user.id }, config.secret)
        return {
            ...userWithoutHash,
            token
        }
    }
}

async function getAll() {
    return await User.find().select('-hash')
}

async function getById(id) {
    return await User.findById(id).select('-hash')
}

async function create(userParam) {
    let passwordHash = null

    // validate
    if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken'
    }

    if (await User.findOne({ phone: userParam.phone })) {
        throw 'Phone "' + userParam.phone + '" is already taken'
    }

    // hash password
    if (userParam.password) {
        passwordHash = bcrypt.hashSync(userParam.password, 10)
    }

    const user = new User({
        name: userParam.name,
        email: userParam.email,
        phone: userParam.phone,
        password: passwordHash,
        role: userParam.role
    })

    // save user
    await user.save().then(result => {
        // Email confiramtion
    })
    .catch(err => console.log(err))
}

async function update(id, userParam) {
    const user = await User.findById(id)

    // validate
    if (!user) throw 'User not found'
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken'
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10)
    }

    // copy userParam properties to user
    Object.assign(user, userParam)

    await user.save()
}

async function _delete(id) {
    await User.findByIdAndRemove(id)
}