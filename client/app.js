// #client/app.js

const PROTO_PATH = "../events.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const fs = require('fs');

let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const credentials = grpc.credentials.createSsl(
    fs.readFileSync('../certs/ca.crt'),
    fs.readFileSync('../certs/client.key'),
    fs.readFileSync('../certs/client.crt')
);


const EventService = grpc.loadPackageDefinition(packageDefinition).EventService;
const client = new EventService("localhost:50051", credentials);
module.exports = client;