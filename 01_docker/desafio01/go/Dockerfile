FROM golang as builder

WORKDIR /build
COPY /src .
RUN go build olamundo.go

FROM scratch
WORKDIR /app
COPY --from=builder /build/olamundo /app
CMD [ "/app/olamundo" ]