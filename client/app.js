// #client/app.js

const PROTO_PATH = "../events.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

let packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    arrays: true
});

const EventService = grpc.loadPackageDefinition(packageDefinition).EventService;
const client = new EventService("127.0.0.1:50051", grpc.credentials.createInsecure());
module.exports = client;