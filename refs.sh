#!/usr/bin/env bash

npx concurrently --raw -k \
  "nodemon ./refs-post-service.js" \
  "nodemon ./refs-user-service.js" \
  "npx wait-on tcp:4001 tcp:4002 && node ./refs-gateway.js"
