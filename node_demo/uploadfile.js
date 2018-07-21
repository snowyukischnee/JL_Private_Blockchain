const request = require('request-promise')
const fs = require('fs')
const config = require("./config.json")

let body = fs.readFileSync("./db decleration.png")
console.log(body)
var options = {
    url: config.swarm,
    method: 'POST',
    headers: {
        'Content-Type': 'text/plain'
    },
    body: body
};

request(options).then(console.log)
