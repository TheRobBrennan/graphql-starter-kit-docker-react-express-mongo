module.exports = {
  newUser: {
    subscribe: (parent, args, { pubsub }) => pubsub.asyncIterator('user-added'),
  },
}
