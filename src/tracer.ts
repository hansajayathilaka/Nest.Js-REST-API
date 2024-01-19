import tracer, { TracerOptions } from "dd-trace";

const config: TracerOptions = {
    hostname: process.env.DATADOG_AGENT_HOST,
    port: process.env.DATADOG_AGENT_PORT,
    logInjection: process.env.DATA_DOG_LOG_INJECTION === "true",
    runtimeMetrics: process.env.DATA_DOG_RUNTIME_METRICS === "true",
    dogstatsd: {
        hostname: process.env.DATADOG_AGENTD_HOST,
        port: Number(process.env.DATADOG_AGENTD_PORT),
    },
    logger: {
        error: (msg) => console.error("DataDog: ", msg),
        warn: (msg) => console.warn("DataDog: ", msg),
        info: (msg) => console.info("DataDog: ", msg),
        debug: (msg) => console.log("DataDog: ", msg),
    },
}
console.log(config);
tracer.init(config);
export default tracer;
