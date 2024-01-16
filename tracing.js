'use strict'

const { diag, DiagConsoleLogger, DiagLogLevel } = require('@opentelemetry/api')
const { NodeSDK } = require('@opentelemetry/sdk-node')
const { Resource } = require('@opentelemetry/resources')
const { SemanticResourceAttributes } = require('@opentelemetry/semantic-conventions')
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http')
const { FastifyInstrumentation } = require('@opentelemetry/instrumentation-fastify')
const { UndiciInstrumentation } = require('opentelemetry-instrumentation-undici')
const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-proto')
const { GraphQLInstrumentation } = require('@opentelemetry/instrumentation-graphql')

class Tracing {
  static setup(serviceName) {
    // diag.setLogger(new DiagConsoleLogger(), DiagLogLevel.DEBUG)
    const sdk = new NodeSDK({
      traceExporter: new OTLPTraceExporter(),
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: serviceName
      }),
      instrumentations: [
        new HttpInstrumentation(),
        new FastifyInstrumentation(),
        new UndiciInstrumentation(),
        new GraphQLInstrumentation({
          // optional params
          allowValues: true,
          // mergeItems: true,
          ignoreTrivialResolveSpans: true,
        })
      ]
    })
    return sdk.start()
  }
}

module.exports = { Tracing }
