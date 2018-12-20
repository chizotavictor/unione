module.exports = function(app) {
    app.use('/users', require('./controllers/user.controller'));

    app.get('/', (req, res, next) => {
        console.log(' / entered')
        res.send({health: 'Great!'})
    })

    // app.post('/users/register', (req, res, next) => {
    //     res.send({name: 'ebuka'})
    // })
}