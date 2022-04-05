// في هذا الملف ، قم بإعداد وحدة المستخدم (المدرس) الخاصة بك | in this file, set up your user module

// 1. قم باستيراد مكتبة moongoose | import the mongoose library

// 2. قم بتحديد مخطط المدرس | start defining your user schema
import { Schema, model } from "mongoose";
import { hashPassword } from "../passHashing";
import shortid from "shortid";

const teacherSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  salt: String,
});

teacherSchema.pre("save", function (next) {
  if (!this.salt) {
    this.salt = shortid.generate();
  }

  if (this.password) {
    this.password = hashPassword(this.password, this.salt);
  }

  next();
});

const teacherModel = new model("Teacher", teacherSchema);

export default teacherModel;
// 3. إنشاء نموذج المدرس | create  the user model

// تخزين كلمة السر بعد عمل الهاش

// 4. تصدير الوحدة | export the module
