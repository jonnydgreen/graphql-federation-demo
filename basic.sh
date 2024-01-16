#!/usr/bin/env bash

npx concurrently --raw -k \
  "nodemon ./basic-post-service.js" \
  "nodemon ./basic-user-service.js" \
  "npx wait-on tcp:4001 tcp:4002 && node ./basic-gateway.js"
