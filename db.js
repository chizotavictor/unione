// const MongoClient = require('mongodb').MongoClient

const config = require('./config.json')

// const DATASOURCE_URI = `mongodb://${config.databaseUser}:${config.databasePassword}@ds139534.mlab.com:39534/unione`

// function connect(url) {
//   return MongoClient.connect(url, { useNewUrlParser: true }).then(client => client.db())
// }

// module.exports = async function() {
//   let database = await Promise.all([connect(DATASOURCE_URI)])

//   return {
//     production: database
//   }
// }

const DATASOURCE_URI = `mongodb://${config.databaseUser}:${config.databasePassword}@ds139534.mlab.com:39534/unione`

module.exports = function(mongoose) {
    mongoose.connect(DATASOURCE_URI, { useNewUrlParser: true })
    mongoose.Promise = global.Promise;
}