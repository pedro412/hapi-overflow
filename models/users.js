'use strict'

const bcrypt = require('bcrypt')

class Users {
  constructor (db) {
    this.db = db
    this.collection = this.db.collection('/users/')
  }

  async createUser (user) {
    user.password = await this.constructor.encrypt(user.password)

    try {
      const newUser = await this.collection.add(user)
      return newUser.id
    } catch (error) {
      return error
    }
  }

  async validateUser (data) {
    const query = await this.collection.where('email', '==', data.email).get()

    if (query._size < 1) {
      return 'wrong credentials'
    } else {
      for (const user of query.docs) {
        const userDoc = await this.collection.doc(user.id).get()
        const passwordOk = await bcrypt.compare(data.password, userDoc.data().password)
        if (passwordOk) {
          return userDoc.data()
        } else {
          return 'wrong credentials'
        }
      }
    }
  }

  static async encrypt (password) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
  }
}

module.exports = Users
