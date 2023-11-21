import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sha256} from 'js-sha256';

import User from './User.js';
import UniModel from './Uni.js';
import Faculty from './Faculties.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log("no connection"));

  // SIGN UP FORM
  app.post("/signup", async (req, res) => {
    console.log(req);
    const { name, age, gender, email, phone, password } = req.body;
    User.findOne({ email: email }).then((students) => {
      if (students) {
        res.status(403).send({ message: "User already registered" })
      }
      else {
        User.findOne({ phone: phone }).then((students) => {
          if (students) {
            res.status(403).send({ message: "User already registered" })
          }
          else {
            let encryptedPasscode = sha256(password);
            const students = new User({
              name: name,
              age: age,
              gender: gender,
              email: email,
              phone: phone,
              encryptedPasscode: encryptedPasscode,
            });
  
            students.save();
            console.log(students._id);
            console.log("User object:", students);
            res.send(students._id);
          }
        })
      }
    })
      .catch((err) => {
        console.log(err);
      });
  });

  //LOGIN
  app.post("/Login", async (req, res) => {
    const { email, password } = req.body;
    User.findOne({ email: email })
      .then((students) => {
        if (students) {
          let encryptedPasscode = sha256(password);
          if (encryptedPasscode === students.encryptedPasscode) {
            res.status(200).send(students._id);
          } else {
            res.status(400).send({ message: "Password didn't match" });
          }
        }
        else {
          res.status(404).send({ message: "User not registered" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  // To fetch user details for profile feature
  app.post("/GetUserDetails", async (req, res) => {
    const {member_id} = req.body;
    const userDetails = await User.find({ _id: member_id })
    console.log(userDetails);
    res.send(userDetails);
  })
  
  // FETCH UNI DETAILS
  app.post("/FetchUniName", async(req, res) => {
    const uni = await UniModel.find();
    console.log(uni);
    res.status(200).send(uni);
  })


  // FACULTY DETAILS
  app.post("/faculty", async (req, res) => {
    const { uni, course, name, education, area, designation} = req.body;
            const faculties = new Faculty({
              uni: uni,
              course: course,
              name: name,
              education: education,
              area: area,
              designation: designation,
            });
  
            faculties.save();
            console.log(faculties);
            res.send(faculties);
          })
          app.post("/GetFacultyDetails", async (req, res) => {
            const {uni} = req.body;
            const facultyDetails = await Faculty.find({uni:uni})
            console.log(facultyDetails);
            res.send(facultyDetails);
          })

  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });