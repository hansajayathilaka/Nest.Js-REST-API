import tracer from "dd-trace";

tracer.init({
    hostname: `${process.env.DATADOG_AGENT_HOST}`,
    port: `${process.env.DATADOG_AGENT_PORT}`,
    env: "dev",
    service: "simple-api",
    logInjection: true,
    tags: {
        "simple-api.version": "1.0.0",
    },
});
export default tracer;
