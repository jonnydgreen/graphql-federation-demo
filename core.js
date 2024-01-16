'use strict'

const Fastify = require('fastify')
const mercuriusWithFederation = require('@mercuriusjs/federation')
const mercurius = require('mercurius')
const { ErrorWithProps } = mercurius

async function createService(port, schema, resolvers = {}, loaders = {}) {
  const service = Fastify()

  service.register(mercuriusWithFederation, {
    schema,
    resolvers,
    loaders,
    graphiql: true,
    jit: 1
  })
  await service.listen({ port })
}

const users = {
  u1: {
    id: 'u1',
    name: 'John'
  },
  u2: {
    id: 'u2',
    name: 'Jane'
  },
  u3: {
    id: 'u3',
    name: 'Jack'
  },
  u4: {
    id: 'u4',
    name: 'Bob'
  },
  u5: {
    id: 'u5',
    name: 'Alice'
  },
  u6: {
    id: 'u6',
    name: 'Sir Digby Chicken Caesar'
  }
}

const posts = {
  p1: {
    pid: 'p1',
    title: 'Post 1',
    content: 'Content 1',
    authorId: 'u1'
  },
  p2: {
    pid: 'p2',
    title: 'Post 2',
    content: 'Content 2',
    authorId: 'u2'
  },
  p3: {
    pid: 'p3',
    title: 'Post 3',
    content: 'Content 3',
    authorId: 'u1'
  },
  p4: {
    pid: 'p4',
    title: 'Post 4',
    content: 'Content 4',
    authorId: 'u2'
  },
  p5: {
    pid: 'p5',
    title: 'Post 5',
    content: 'Content 5',
    authorId: 'u3'
  },
  p6: {
    pid: 'p6',
    title: 'Post 6',
    content: 'Content 6',
    authorId: 'u4'
  },
  p7: {
    pid: 'p7',
    title: 'Post 7',
    content: 'Content 7',
    authorId: 'u5'
  },
  p8: {
    pid: 'p8',
    title: 'Post 8',
    content: 'Content 8',
    authorId: 'u6'
  },
  p9: {
    pid: 'p9',
    title: 'Post 9',
    content: 'Content 9',
    authorId: 'u4'
  },
  p10: {
    pid: 'p10',
    title: 'Post 10',
    content: 'Content 10',
    authorId: 'u2'
  }
}

async function getUser(id) {
  return users[id]
}

async function getUsers() {
  return users
}

async function getUsersByIds(ids) {
  return ids.map((id) => users[id])
}

async function getPost(id) {
  return posts[id]
}

async function getPosts() {
  return posts
}

async function getPostsByIds(ids) {
  return ids.map((id) => posts[id])
}

module.exports = {
  createService,
  getUser,
  getUsers,
  getUsersByIds,
  getPost,
  getPosts,
  getPostsByIds
}
