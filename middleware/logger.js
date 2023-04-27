const express = require("express");

const logger = (req, res, next) => {
  const colorGet = "\x1b[36m";
  const colorPost = "\x1b[32m";
  const colorDelete = "\x1b[31m";

  switch (req.method) {
    case "GET": {
      console.info(`${colorGet}${req.method} request to ${req.path}`);
      break;
    }
    case "POST": {
      console.info(` ${colorPost}${req.method} request to ${req.path}`);
      break;
    }
    case "DELETE": {
      console.info(` ${colorDelete}${req.method} request to ${req.path}`);
      break;
    }
    default:
      console.log(`${colorGet}${req.method} request to ${req.path}`);
  }

  next();
};

exports.logger = logger;
