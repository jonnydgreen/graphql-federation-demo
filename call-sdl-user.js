'use strict'

const { fetch } = require('undici')
const { performance } = require('node:perf_hooks')

const query = `
  query {
    _service {
      sdl
    }
  }
`

async function main() {
  const t0 = performance.now()
  const response = await fetch('http://localhost:4001/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query })
  })
  const t1 = performance.now()

  console.error(`Call took ${t1 - t0} milliseconds.`)
  console.error(response.status, response.statusText)
  const json = await response.json()
  const sdl = json.data._service.sdl
  console.log(sdl)
}

main()
