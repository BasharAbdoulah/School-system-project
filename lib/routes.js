"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _Student = _interopRequireDefault(require("./models/Student"));

var _Teacher = _interopRequireDefault(require("./models/Teacher"));

var _joi = _interopRequireDefault(require("joi"));

var _passHashing = require("./passHashing");

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var setUpRoutes = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(app) {
    return _regenerator["default"].wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            app.get("/students", /*#__PURE__*/function () {
              var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
                var students, token, decodedToken, teacher;
                return _regenerator["default"].wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return _Student["default"].find({});

                      case 2:
                        students = _context.sent;
                        _context.prev = 3;
                        token = req.headers.authorization;

                        if (token) {
                          _context.next = 9;
                          break;
                        }

                        res.statusCode = 401;
                        res.send("You have no permissions!!");
                        return _context.abrupt("return");

                      case 9:
                        decodedToken = _jsonwebtoken["default"].decode(token);
                        _context.next = 12;
                        return _Teacher["default"].findById(decodedToken.sub);

                      case 12:
                        teacher = _context.sent;

                        if (teacher) {
                          _context.next = 17;
                          break;
                        }

                        res.statusCode = 401;
                        res.send("You have no permissions");
                        return _context.abrupt("return");

                      case 17:
                        _jsonwebtoken["default"].verify(token, teacher.salt);

                        _context.next = 24;
                        break;

                      case 20:
                        _context.prev = 20;
                        _context.t0 = _context["catch"](3);
                        res.statusCode = 401;
                        res.send("You have no permissions");

                      case 24:
                        res.send(students);

                      case 25:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[3, 20]]);
              }));

              return function (_x2, _x3) {
                return _ref2.apply(this, arguments);
              };
            }()); // Add Studdents

            app.post("/students/add", /*#__PURE__*/function () {
              var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
                var token, decodedToken, teacher, _req$body, name, birthdate, email, city, bodySchema, validation, newStudent;

                return _regenerator["default"].wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        // get token from headers
                        token = req.headers.authorization;

                        if (token) {
                          _context2.next = 5;
                          break;
                        }

                        // check if there is token let him keep going
                        res.statusCode = 401;
                        res.send("You have no permissions!!");
                        return _context2.abrupt("return");

                      case 5:
                        decodedToken = _jsonwebtoken["default"].decode(token); // do decoded for the token and get teacher if he exsit

                        _context2.next = 8;
                        return _Teacher["default"].findById(decodedToken.sub);

                      case 8:
                        teacher = _context2.sent;

                        if (teacher) {
                          _context2.next = 13;
                          break;
                        }

                        // check if we have this teacher let him keep going
                        res.statusCode = 401;
                        res.send("You have no permissions");
                        return _context2.abrupt("return");

                      case 13:
                        _jsonwebtoken["default"].verify(token, teacher.salt);

                        _req$body = req.body, name = _req$body.name, birthdate = _req$body.birthdate, email = _req$body.email, city = _req$body.city;
                        bodySchema = _joi["default"].object({
                          email: _joi["default"].string().email().required(),
                          name: _joi["default"].string().required(),
                          birthdate: _joi["default"].string().required(),
                          city: _joi["default"].string().required()
                        });
                        validation = bodySchema.validate(req.body);

                        if (!validation.error) {
                          _context2.next = 21;
                          break;
                        }

                        res.statusCode = 400;
                        res.send(validation.error.message);
                        return _context2.abrupt("return");

                      case 21:
                        _context2.prev = 21;
                        newStudent = (0, _Student["default"])({
                          name: name,
                          email: email,
                          birthdate: birthdate,
                          city: city
                        });
                        _context2.next = 25;
                        return newStudent.save();

                      case 25:
                        res.send(newStudent);
                        _context2.next = 32;
                        break;

                      case 28:
                        _context2.prev = 28;
                        _context2.t0 = _context2["catch"](21);
                        res.statusCode = 400;
                        res.send(_context2.t0.message);

                      case 32:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, null, [[21, 28]]);
              }));

              return function (_x4, _x5) {
                return _ref3.apply(this, arguments);
              };
            }()); // Rigister Teacher

            app.post("/teacher/register", /*#__PURE__*/function () {
              var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
                var _req$body2, name, email, password, bodySchema, validationRes, newTeacher;

                return _regenerator["default"].wrap(function _callee3$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        _req$body2 = req.body, name = _req$body2.name, email = _req$body2.email, password = _req$body2.password;
                        bodySchema = _joi["default"].object({
                          email: _joi["default"].string().email().required(),
                          name: _joi["default"].string().required(),
                          password: _joi["default"].string().min(6).required()
                        });
                        validationRes = bodySchema.validate(req.body);

                        if (!validationRes.error) {
                          _context3.next = 7;
                          break;
                        }

                        res.statusCode = 400;
                        res.send(validationRes.error.message);
                        return _context3.abrupt("return");

                      case 7:
                        _context3.prev = 7;
                        newTeacher = (0, _Teacher["default"])({
                          name: name,
                          email: email,
                          password: password
                        });
                        _context3.next = 11;
                        return newTeacher.save();

                      case 11:
                        res.send(newTeacher);
                        _context3.next = 18;
                        break;

                      case 14:
                        _context3.prev = 14;
                        _context3.t0 = _context3["catch"](7);
                        res.statusCode = 400;
                        res.send(_context3.t0.message);

                      case 18:
                      case "end":
                        return _context3.stop();
                    }
                  }
                }, _callee3, null, [[7, 14]]);
              }));

              return function (_x6, _x7) {
                return _ref4.apply(this, arguments);
              };
            }()); // Teacher login

            app.post("/teacher/login", /*#__PURE__*/function () {
              var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
                var _req$body3, email, password, teacher, token;

                return _regenerator["default"].wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;
                        _context4.next = 3;
                        return _Teacher["default"].findOne({
                          email: email
                        });

                      case 3:
                        teacher = _context4.sent;

                        if (!teacher) {
                          res.statusCode = 403;
                          res.send("Teacher not exist");
                        } else {
                          if (teacher.password === (0, _passHashing.hashPassword)(password, teacher.salt)) {
                            token = _jsonwebtoken["default"].sign({
                              sub: teacher._id
                            }, teacher.salt);
                            res.send(token);
                          } else {
                            res.statusCode = 401;
                            res.send("Password is wrong!!");
                          }
                        }

                      case 5:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x8, _x9) {
                return _ref5.apply(this, arguments);
              };
            }());
            app.put("/students/:id", /*#__PURE__*/function () {
              var _ref6 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
                var id, student, _req$body4, name, birthdate, city;

                return _regenerator["default"].wrap(function _callee5$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        id = req.params.id;
                        _context5.next = 3;
                        return _Student["default"].findById(id);

                      case 3:
                        student = _context5.sent;

                        if (!student) {
                          res.statusCode = 404;
                          res.send("Student Not Found!!");
                        } else {
                          _req$body4 = req.body, name = _req$body4.name, birthdate = _req$body4.birthdate, city = _req$body4.city;

                          if (name || birthdate || city) {
                            student.name = name;
                            student.birthdate = birthdate;
                            student.city = city;
                            student.save();
                          }

                          res.send(student);
                        }

                      case 5:
                      case "end":
                        return _context5.stop();
                    }
                  }
                }, _callee5);
              }));

              return function (_x10, _x11) {
                return _ref6.apply(this, arguments);
              };
            }()); // Delete spisfic student

            app["delete"]("/students/delete/:id", /*#__PURE__*/function () {
              var _ref7 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
                var token, decodedToken, teacher;
                return _regenerator["default"].wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        // get token from headers
                        token = req.headers.authorization;

                        if (token) {
                          _context6.next = 5;
                          break;
                        }

                        // check if there is token let him keep going
                        res.statusCode = 401;
                        res.send("You have no permissions!!");
                        return _context6.abrupt("return");

                      case 5:
                        decodedToken = _jsonwebtoken["default"].decode(token); // do decoded for the token and get teacher if he exsit

                        _context6.next = 8;
                        return _Teacher["default"].findById(decodedToken.sub);

                      case 8:
                        teacher = _context6.sent;

                        if (teacher) {
                          _context6.next = 13;
                          break;
                        }

                        // check if we have this teacher let him keep going
                        res.statusCode = 401;
                        res.send("You have no permissions");
                        return _context6.abrupt("return");

                      case 13:
                        _jsonwebtoken["default"].verify(token, teacher.salt);

                        _Student["default"].deleteOne({
                          _id: req.params.id
                        }).then(function (result) {
                          return res.json(result);
                        })["catch"](function (err) {
                          return res.send({
                            errMsg: err
                          });
                        });

                      case 15:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6);
              }));

              return function (_x12, _x13) {
                return _ref7.apply(this, arguments);
              };
            }());

          case 6:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7);
  }));

  return function setUpRoutes(_x) {
    return _ref.apply(this, arguments);
  };
}();

var _default = setUpRoutes;
exports["default"] = _default;