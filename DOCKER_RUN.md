## Run in Docker


### Run Postgres Container
```bash
docker run -d --name=db \
  -v ./pgdata:/var/lib/postgresql/data \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=postgres \
  -p 5432:5432/tcp \
  postgres:13.3-alpine
```

### Build Docker Image
```bash
docker build -t app .
```

### Run Docker Container
```bash
docker run -d --name=app \
  -v ./src:/app/src \
  -p 3000:3000/tcp \
  -e DATABASE_HOST=db \
  -e DATABASE_PORT=5432 \
  -e DATABASE_USER=postgres \
  -e DATABASE_PASSWORD=postgres \
  -e DATABASE_NAME=postgres \
  -e PORT=3000 \
  -e MODE=DEV \
  -e RUN_MIGRATIONS=true \
  -e JWT_SECRET=secret \
  -e JWT_EXPIRES_IN=60s \
  -e JWT_REFRESH_TOKEN_EXPIRES_IN=1d \
  -e DD_ENV=DEV \
  -e DD_TAGS="os:ubuntu,team:dev,zone:onprem,service:backend" \
  -e DD_TRACE_ENABLED=true \
  -e DD_TRACING_ENABLED=true \
  -e DD_TRACE_DEBUG=false \
  -e DD_TRACE_AGENT_HOSTNAME=datadog-agent \
  -e DD_TRACE_AGENT_PORT=8126 \
  -e DD_DOGSTATSD_PORT=8125 \
  -e DD_LOGS_INJECTION=true \
  -e DD_TRACE_SAMPLE_RATE=1 \
  -e DD_RUNTIME_METRICS_ENABLED=true \
  -e DD_PROFILING_ENABLED=true \
  -e DD_DBM_PROPAGATION_MODE=full \
  -e DD_APPSEC_ENABLED=true \
  app
```
