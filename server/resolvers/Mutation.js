const fetch = require('node-fetch')

module.exports = {
  addFakeUsers: async (root, { count }, { db, pubsub }) => {
    var randomUserApi = `https://randomuser.me/api/?results=${count}`

    var { results } = await fetch(randomUserApi).then(res => res.json())

    var users = results.map(r => ({
      githubLogin: r.login.username,
      name: `${r.name.first} ${r.name.last}`,
      avatar: r.picture.thumbnail,
      githubToken: r.login.sha1,
    }))

    await db.collection('users').insert(users)
    var newUsers = await db
      .collection('users')
      .find()
      .sort({ _id: -1 })
      .limit(count)
      .toArray()

    newUsers.forEach(newUser => pubsub.publish('user-added', { newUser }))

    return users
  },
}
