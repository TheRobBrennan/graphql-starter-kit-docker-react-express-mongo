const express = require('express')
const checkEnv = require('check-env')
const { createServer } = require('http')
const { ApolloServer, PubSub } = require('apollo-server-express')
const { MongoClient } = require('mongodb')
const { readFileSync } = require('fs')
const expressPlayground = require('graphql-playground-middleware-express').default
const resolvers = require('./resolvers')
const path = require('path')
const depthLimit = require('graphql-depth-limit')
const { createComplexityLimitRule } = require('graphql-validation-complexity')

require('dotenv').config()
// Throw an error if we don't have a required environment variable
checkEnv(['MONGO_URI'])
var typeDefs = readFileSync('./typeDefs.graphql', 'UTF-8')

async function start() {
  const app = express()
  const MONGO_URI = process.env.MONGO_URI
  const pubsub = new PubSub()
  const client = await MongoClient.connect(MONGO_URI, { useNewUrlParser: true })
  const db = client.db()
  
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    // validationRules: [
    //   depthLimit(5),
    //   createComplexityLimitRule(1000, {
    //       onCost: cost => console.log('query cost: ', cost)
    //   })
    // ],
    context: async ({ req, connection }) => {
      return { db, pubsub }
    }
  })

  server.applyMiddleware({ app })

  app.get('/playground', expressPlayground({ endpoint: '/graphql' }))

  app.get('/', (req, res) => {
    // const clientId = process.env.GITHUB_OAUTH_APPLICATION_CLIENT_ID
    // let url = `https://github.com/login/oauth/authorize?client_id=${clientId}&scope=user`
    // res.end(`<a href="${url}">Sign In with Github</a>`)
    res.end(`OK.`)
  })

  const httpServer = createServer(app)
  server.installSubscriptionHandlers(httpServer)
  httpServer.timeout = 5000

  httpServer.listen({ port: 4000 }, () =>
    console.log(`GraphQL server running at http://localhost:4000${server.graphqlPath}`)
  )
}

start()
