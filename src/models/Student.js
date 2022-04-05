// في هذا الملف ، قم بإعداد وحدة المستخدم (الطالب) الخاصة بك | in this file, set up your user module

// 1. قم باستيراد مكتبة moongoose | import the mongoose library

// 2. قم بتحديد مخطط الطالب | start defining your user schema

import { string } from "joi";
import { Schema, model } from "mongoose";
import shortid from "shortid";
import mongoose from "mongoose";

const studentSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  city: String,
  birthdate: String,
});

const studentModel = new model("student", studentSchema);

// to add students
// const examp = new studentModel({
//   name: "Majed",
//   email: "majed@barmej.com",
//   city: "Iraq",
//   birthdate: "1994",
// });
// examp.save();

export default studentModel;

// 3. إنشاء نموذج الطالب | create  the user model

// 4. تصدير الوحدة | export the module
