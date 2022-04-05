"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hashPassword = void 0;

var crypto = require("crypto"); // const password = "password";
// const hash1 = crypto.createHash("sha256").update(password).digest("hex");
// const hash2 = console.log(hash1);
// console.log(hash2);


var hashPassword = function hashPassword(password) {
  var salt = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "secret";
  return crypto.createHmac("sha256", salt).update(password).digest("hex");
}; //


exports.hashPassword = hashPassword;