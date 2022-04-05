"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _mongoose = require("mongoose");

var _passHashing = require("../passHashing");

var _shortid = _interopRequireDefault(require("shortid"));

// في هذا الملف ، قم بإعداد وحدة المستخدم (المدرس) الخاصة بك | in this file, set up your user module
// 1. قم باستيراد مكتبة moongoose | import the mongoose library
// 2. قم بتحديد مخطط المدرس | start defining your user schema
var teacherSchema = new _mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true
  },
  password: String,
  salt: String
});
teacherSchema.pre("save", function (next) {
  if (!this.salt) {
    this.salt = _shortid["default"].generate();
  }

  if (this.password) {
    this.password = (0, _passHashing.hashPassword)(this.password, this.salt);
  }

  next();
});
var teacherModel = new _mongoose.model("Teacher", teacherSchema);
var _default = teacherModel; // 3. إنشاء نموذج المدرس | create  the user model
// تخزين كلمة السر بعد عمل الهاش
// 4. تصدير الوحدة | export the module

exports["default"] = _default;