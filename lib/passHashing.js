"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = void 0;

var crypto = require("crypto");

var hashPassword = function hashPassword(password) {
  var salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "secret";
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
}; //


exports.hashPassword = hashPassword;