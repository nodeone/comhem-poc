const express = require("express");
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const request = require("request-promise");
var apiResponse = null;
var get = "";
/////////////////////////////////////////////
// ALLOW CORS TO localhost:3000 dev server
/////////////////////////////////////////////
const allowCrossDomain = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
}
/////////////////////////////////////////////
// APP CONFIGURATION
/////////////////////////////////////////////
app.use(allowCrossDomain);
app.get("/channels", (req, res) => {
    var options = {
        url: "http://83.255.232.105:8080/webapi/events/current?backwardCount=15&forwardCount=1",
        headers: {
            "webapi-version" : "99",
            "api-key": "HZvTr4YV8B"
        }
    };
    request(options).then(function (body){
        apiResponse = JSON.parse(body);
        res.send(apiResponse);
    })
        .catch(function (err) {
            console.log(err);
        });
});

app.get("/channel-event", (req, res) => {
    var query = req.query;
    console.log(query.eventCount, "eventCount");
      
    var options = {
        url: "http://83.255.232.105:8080/webapi/events/current?backwardCount=15&forwardCount="+ query.eventCount +"&channelID="+ query.channelID,
        headers: {
            "webapi-version" : "99",
            "api-key": "HZvTr4YV8B"
        }
    };

    const callback = (error, response, body) => {
        if (!error && response.statusCode == 200) {
            apiResponse = JSON.parse(body);
            console.log(apiResponse);
        } else {
            console.log(error);
        }
    }
    request(options).then(function (body){
        apiResponse = JSON.parse(body);
        res.send(apiResponse);
    });
});

app.listen(port);
console.log("Server started!");
