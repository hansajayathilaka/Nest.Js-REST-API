import tracer from "dd-trace";

tracer.init({
    hostname: process.env.DATADOG_AGENT_HOST,
    port: process.env.DATADOG_AGENT_PORT,
    logInjection: process.env.DATA_DOG_LOG_INJECTION === "true",
    runtimeMetrics: process.env.DATA_DOG_RUNTIME_METRICS === "true",
    dogstatsd: {
        hostname: process.env.DATADOG_AGENTD_HOST,
        port: Number(process.env.DATADOG_AGENTD_PORT),
    },
});
export default tracer;
