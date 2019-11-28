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

  async validateUser (data) {
    const query = await this.collection.where('email', '==', data.email).get()

    if (query._size !== 1) {
      console.log(query)
      return 'wrong credentials'
    }

    for (const user of query.docs) {
      const userDoc = await this.collection.doc(user.id).get()
      const passwordOk = await bcrypt.compare(data.password, userDoc.data().password)
      if (passwordOk) {
        return userDoc.data()
      } else {
        return 'wrong credentials'
      }
    }

    // .then(snapshot => {
    //   if (snapshot.empty) {
    //     console.log('No matching documents.')
    //     return
    //   }

    //   snapshot.forEach(async doc => {
    //     const passwordOk = await bcrypt.compare(data.password, doc.data().password)
    //     if (passwordOk) {
    //       console.log('ok')

    //       return doc.data()
    //     } else {
    //       console.log('no ok')

    //       return 'wrong credentials'
    //     }
    //   })
    // })
    // .catch(err => {
    //   console.log('Error getting documents', err)
    // })

    return query
  }

  static async encrypt (password) {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    return hashedPassword
  }
}

module.exports = Users
