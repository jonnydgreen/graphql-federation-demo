'use strict'

const { Tracing } = require('./tracing')

Tracing.setup('basic-post-service')

const { getUser, getPosts, getUsers, createService } = require('./core')

createService(
  4002,
  `
  type Post {
    pid: ID!
    title: String
    content: String
  }

  type Query {
    topPosts(count: Int): [Post]
  }

  input PostInput {
    title: String!
    content: String!
    authorId: String!
  }
`,
  {
    Query: {
      topPosts: async (root, { count = 2 }) => Object.values(await getPosts()).slice(0, count)
    }
  }
)
