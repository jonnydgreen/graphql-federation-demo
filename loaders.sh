#!/usr/bin/env bash

npx concurrently --raw -k \
  "nodemon ./loaders-post-service.js" \
  "nodemon ./loaders-user-service.js" \
  "npx wait-on tcp:4001 tcp:4002 && node ./loaders-gateway.js"
