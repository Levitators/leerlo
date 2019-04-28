FROM node:8 as react-build

WORKDIR /app

COPY public/ public/
COPY src/ src/
COPY package.json yarn.lock tsconfig.json ./

RUN yarn

RUN yarn build

FROM golang:1.12

WORKDIR /server

COPY --from=react-build /app/build build/

COPY main.go go.mod go.sum ./

RUN go mod download

RUN CGO_ENABLED=0 GOOS=linux GOARCH=amd64 go build

EXPOSE 3000

ENTRYPOINT ["/server/leerlo"]
