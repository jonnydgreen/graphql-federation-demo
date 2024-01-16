'use strict'

const { Tracing } = require('./tracing')

Tracing.setup('refs-gateway')

const Fastify = require('fastify')
const mercuriusWithGateway = require('@mercuriusjs/gateway')

const gateway = Fastify()

gateway.register(mercuriusWithGateway, {
  graphiql: true,
  jit: 1,
  gateway: {
    services: [
      {
        name: 'user',
        url: 'http://localhost:4001/graphql',
        setResponseHeaders: (reply) => {
          reply.header('abc', 'abc')
        }
      },
      {
        name: 'post',
        url: 'http://localhost:4002/graphql'
      }
    ]
  }
})

gateway.listen({ port: 4000 })
