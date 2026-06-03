FROM curlimages/curl:8.20.0 AS downloader

ARG OTEL_VERSION=2.28.1

RUN curl -L "https://github.com/open-telemetry/opentelemetry-java-instrumentation/releases/download/v${OTEL_VERSION}/opentelemetry-javaagent.jar" \
    -o /tmp/otel-javaagent.jar

FROM alpine:3.21

COPY --from=downloader /tmp/otel-javaagent.jar /otel/otel-javaagent.jar

CMD ["sh", "-c", "echo 'OTel agent pronto em /otel/otel-javaagent.jar'"]
