const { LossesDB } = require("./dbUtils");
const { LossQuote } = require("./lossCalc");
const cors = require("cors");

exports.Routing = () => {
  /* Express */
  const express = require("express");
  const app = express();
  app.use(express.static("public"));
  app.use(cors());

  // define the routes
  app.get("/api/losses", function (req, res) {
    const queryLimit = req.query.limit || 10;

    LossesDB.findAll({
      order: [["timestamp", "desc"]],
      limit: queryLimit,
    })
      .then((queryres) => res.send({ result: queryres }))
      .catch((err) => console.log(err));
  });

  app.get("/api/calcloss", function (req, res) {
    const fromToken = req.query.fromToken;
    const toToken = req.query.toToken;
    const amount = req.query.amount;

    LossQuote(fromToken, toToken, amount)
      .then((queryRes) => res.send({ result: { swaploss: queryRes } }))
      .catch((err) => console.log(err));
  });

  return app;
};
