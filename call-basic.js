'use strict'

const { fetch } = require('undici')
const { performance } = require('node:perf_hooks')

const query = `
  query {
    me {
      name
    }
    topPosts(count: 6) {
      title
    }
  }
`
async function main() {
  const t0 = performance.now()
  const response = await fetch('http://localhost:4000/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })
  const t1 = performance.now()

  console.log(`Call took ${t1 - t0} milliseconds.`)
  console.log(response.status, response.statusText)
  console.log(JSON.stringify(await response.json(), null, 2))
}

main()
