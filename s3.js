const fs = require("fs");
const S3rver = require("s3rver");

console.log("we are here");

new S3rver({
  port: 9000,
  directory: "./s3",
  configureBuckets: [
    {
      name: "bucketforbirdfeed",
      configs: [fs.readFileSync("./cors.xml")],
    },
  ],
}).run();