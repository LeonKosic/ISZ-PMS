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
import {authenticateToken,authenticateAdmin} from "../middleware/auth.js"
import { course } from "../db/schema/schema.js";

router.post('/category',authenticateToken,authenticateAdmin,jsonParser,async(req,res)=>{

const schema = Joi.object({
    name: Joi.string().required()})
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
    const existingCategory = await db.select().from(category).where(eq(category.name,req.body.name));
    if (existingCategory.length > 0) {
      res.status(400).send({err:"Category already exists."})
      return
    }
    await db.insert(category).values(
      [{name: req.body.name,
        deleted:0
    }]
  );
  res.status(200).send({ message: "Category made." });
  })
  

  router.delete('/category',authenticateToken,authenticateAdmin,jsonParser,async(req,res)=>{
    const existingCategory = await db.select().from(category).where(eq(category.name,req.body.name));
  if (existingCategory.length <= 0) {
    res.status(400).send({err:"Category does not exist."})
    return
  }
    await db.update(category).set({deleted: '1'}).where(eq(category.name,req.body.name))
    res.status(200).send({message:"Category deleted."})

  })


export default router;
