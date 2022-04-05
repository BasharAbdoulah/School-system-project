import studentModel from "./models/Student";
import teacherModel from "./models/Teacher";
import Joi from "joi";
import { hashPassword } from "./passHashing";
import jwt from "jsonwebtoken";

const setUpRoutes = async (app) => {
  app.get("/students", async (req, res) => {
    let students = await studentModel.find({});
    try {
      const token = req.headers.authorization;

      if (!token) {
        res.statusCode = 401;
        res.send("You have no permissions!!");
        return;
      }

      const decodedToken = jwt.decode(token);
      const teacher = await teacherModel.findById(decodedToken.sub);

      if (!teacher) {
        res.statusCode = 401;
        res.send("You have no permissions");

        return;
      }

      jwt.verify(token, teacher.salt);
    } catch (error) {
      res.statusCode = 401;
      res.send("You have no permissions");
    }
    res.send(students);
  });

  // Add Studdents
  app.post("/students/add", async (req, res) => {
    const { name, birthdate, email, city } = req.body;

    const bodySchema = Joi.object({
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      birthdate: Joi.string().required(),
      city: Joi.string().required(),
    });

    const validation = bodySchema.validate(req.body);

    if (validation.error) {
      res.statusCode = 400;
      res.send(validation.error.message);
      return;
    }

    try {
      const newStudent = studentModel({
        name,
        email,
        birthdate,
        city,
      });

      await newStudent.save();
      res.send(newStudent);
    } catch (error) {
      res.statusCode = 400;
      res.send(error.message);
    }
  });

  // Rigister Teacher
  app.post("/teacher/register", async (req, res) => {
    const { name, email, password } = req.body;

    const bodySchema = Joi.object({
      email: Joi.string().email().required(),
      name: Joi.string().required(),
      password: Joi.string().min(6).required(),
    });

    const validationRes = bodySchema.validate(req.body);
    if (validationRes.error) {
      res.statusCode = 400;
      res.send(validationRes.error.message);

      return;
    }

    try {
      const newTeacher = teacherModel({
        name,
        email,
        password,
      });

      await newTeacher.save();

      res.send(newTeacher);
    } catch (error) {
      res.statusCode = 400;
      res.send(error.message);
    }
  });

  // Teacher login
  app.post("/teacher/login", async (req, res) => {
    const { email, password } = req.body;

    const teacher = await teacherModel.findOne({ email });

    if (!teacher) {
      res.statusCode = 403;
      res.send("Teacher not exist");
    } else {
      if (teacher.password === hashPassword(password, teacher.salt)) {
        const token = jwt.sign({ sub: teacher._id }, teacher.salt, {
          expiresIn: 30,
        });
        res.send(token);
      } else {
        res.statusCode = 401;
        res.send("Password is wrong!!");
      }
    }
  });

  app.put("/students/:id", async (req, res) => {
    const { id } = req.params;

    const student = await studentModel.findById(id);

    if (!student) {
      res.statusCode = 404;
      res.send("Student Not Found!!");
    } else {
      const { name, birthdate, city } = req.body;

      if (name || birthdate || city) {
        student.name = name;
        student.birthdate = birthdate;
        student.city = city;
        student.save();
      }
      res.send(student);
    }
  });

  // Delete spisfic stident
  app.delete("/students/delete/:id", (req, res) => {
    studentModel
      .deleteOne({ _id: req.params.id })
      .then((result) => res.json(result))
      .catch((err) =>
        res.send({
          errMsg: err,
        })
      );
  });
};

export default setUpRoutes;
