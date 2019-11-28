'use strict'

const admin = require('firebase-admin')
const serviceAccount = require('../config/firebase.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://hapioverflowdemo.firebaseio.com'
})

const db = admin.firestore()

const Users = require('./users')

module.exports = {
  users: new Users(db)
}
