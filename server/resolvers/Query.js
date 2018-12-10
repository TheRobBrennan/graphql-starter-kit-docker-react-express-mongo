module.exports = {
  totalUsers: (parent, args, { db }) =>
    db.collection('users').estimatedDocumentCount(),

  allUsers: (parent, args, { db }) =>
    db
      .collection('users')
      .find()
      .toArray(),

  User: (parent, args, { db }) =>
    db.collection('users').findOne({ githubLogin: args.login }),
}
