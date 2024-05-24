FROM golang:1.22.2

RUN apk add git

WORKDIR /filesystem

LABEL maintainer="<>"

RUN mkdir /fs
ADD . /fs
WORKDIR /fs

COPY go.mod go.sum ./

RUN go mod download

COPY . .

RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main .

FROM alpine:latest

RUN apk --no-cache add ca-certificates curl

RUN mkdir /fs

WORKDIR /fs

COPY --from=builder /app/main .

EXPOSE 7070

CMD ["./main"]