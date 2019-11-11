const User = require('../../models/user')
const passport = require('../../libs/passport')
const HTTPError = require('../../libs/http-error')
const ah = require('../../libs/async-handler')

const login = (req, res, next) =>
    passport.authenticate(
        'local',
        (err, user, message) => {
            if(err) return next(err)

            if(user)
                req.login(user, err => {
                    if(err) return next(err)

                    res.json(user.selectToSend(true))
                })
            else
                return next(new HTTPError(401, message))
        }
    )(req, res, next)

const logout = (req, res, next) => {
    req.logout()
    res.json({user: false})
}

const register = ah(async (req, res, next) => {
    const {email, password, displayName} = req.body

    if(!email)
        return next(new HTTPError(400, 'please provide an email'))

    if(!password)
        return next(new HTTPError(400, 'please provide a password'))

    const existEmail = await User.findOne({email})

    if(existEmail)
        return next(new HTTPError(400, 'such email already registred'))

    const user = new User({email, password, displayName})

    await user.setPassword(password)
    await user.save()

    return res.status(201).json(user.selectToSend(true))
})

const checkAuth =  (req, res, next) => {
    if(req.isAuthenticated())
        return next()

    next(new HTTPError(401))
}

const getSelf = (req, res, next) => {
    if(req.isAuthenticated())
        return res.json(req.user.selectToSend(true))

    res.json({user: false})
}

module.exports = {
    login,
    logout,
    register,
    checkAuth,
    getSelf
}