import {category} from "../db/schema/category.js"
import { eq } from 'drizzle-orm';
import {db} from '../db/db.js';
import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcrypt';
import Joi from 'joi';

import jwt from 'jsonwebtoken'
const router = express.Router();
const jsonParser = bodyParser.json()
import { authenticateTeacher } from "../middleware/authTeacher.js"; 
import { authenticateToken } from "../middleware/auth.js";
import { course } from "../db/schema/schema.js";
router.post('/create_course',authenticateToken,authenticateTeacher,jsonParser,async(req,res)=>{

    const schema = Joi.object({
      name: Joi.string().required(),
      password: Joi.string().required(),
      password2: Joi.string().required()
  });
  const options={
    errors: {
      wrap: {
        label: false
      }
    }
  }
  const { error, value } = schema.validate(req.body,options);
  
  if (error) {
    res.send(400,{err:error.details})
    return
  }
    const existingCourse = await db.select().from(course).where(eq(course.name,req.body.name));
    if (existingCourse.length > 0) {
      res.status(400).send({err:"Course already exists."})
      return
    }
    if(req.body.password!=req.body.password2){
      res.send(400,{err:"Passwords do not match."})
      return
    }
    const hash =  await bcrypt.hash(req.body.password,10);
    await db.insert(course).values(
      [{name: req.body.name,
        password:hash,
        deleted:0
    }]
  );
  res.status(200).send({ message: "Course made." });
  })
  
  router.delete('/course',authenticateToken,authenticateTeacher,jsonParser,async(req,res)=>{
    const existingCourse = await db.select().from(course).where(eq(course.name,req.body.name));
  if (existingCourse.length <= 0) {
    res.status(400).send({err:"Course does not exist."})
    return
  }
    await db.update(course).set({deleted: '1'}).where(eq(course.name,req.body.name))
    res.status(200).send({message:"Course deleted."})
  })

  export default router;