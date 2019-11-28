'use strict'

const bcrypt = require('bcrypt')

class Users {
  constructor (db) {
    this.db = db
    this.collection = this.db.collection('/users/')
  }

  async createUser (user) {
    user.password = await this.constructor.encrypt(user.password)
    const newUser = await this.collection.add(user)
    console.log(newUser)

    return newUser.id
  }

  static async encrypt (password) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
  }
}

module.exports = Users
