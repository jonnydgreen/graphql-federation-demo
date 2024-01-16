'use strict'

const { Tracing } = require('./tracing')

Tracing.setup('refs-post-service')

const { getUser, getPosts, getUsers, createService } = require('./core')

createService(
  4002,
  `
  type Post @key(fields: "pid") {
    pid: ID!
    title: String
    content: String
    author: User
  }

  type Query @extends {
    topPosts(count: Int): [Post]
  }

  type User @key(fields: "id") @extends {
    id: ID! @external
    posts: [Post]
  }

  input PostInput {
    title: String!
    content: String!
    authorId: String!
  }
`,
  {
    Post: {
      __resolveReference: (post, args, context, info) => {
        return getPost(post.pid)
      },
      author: (post, args, context, info) => {
        return {
          __typename: 'User',
          id: post.authorId
        }
      }
    },
    User: {
      posts: async (user, args, context, info) => {
        return Object.values(await getPosts()).filter((p) => p.authorId === user.id)
      }
    },
    Query: {
      topPosts: async (root, { count = 2 }) => Object.values(await getPosts()).slice(0, count)
    }
  }
)
