'use strict'

const { Tracing } = require('./tracing')

Tracing.setup('refs-user-service')

const { getUser, getPosts, getUsers, createService } = require('./core')

createService(
  4001,
  `
  extend type Query {
    me: User
    you: User
    hello: String
  }

  type User @key(fields: "id") {
    id: ID!
    name: String!
    fullName: String
    avatar(size: AvatarSize): String
    friends: [User]
  }

  enum AvatarSize {
    small
    medium
    large
  }
`,
  {
    Query: {
      me: (root, args, context, info) => {
        return getUser('u1')
      },
      you: (root, args, context, info) => {
        throw new ErrorWithProps("Can't fetch other users data", { code: 'NOT_ALLOWED' })
      },
      hello: () => 'world'
    },
    User: {
      __resolveReference: (user, args, context, info) => {
        console.log(`Resolving user with ID: ${user.id}`)
        return getUser(user.id)
      },
      avatar: (user, { size }) => `avatar-${size}.jpg`,
      friends: async (user) => Object.values(await getUsers()).filter((u) => u.id !== user.id),
      fullName: (user) => user.name + ' Doe'
    }
  }
)
