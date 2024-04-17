import {category} from "../db/schema/category.js"
import { eq } from 'drizzle-orm';
import {db} from '../db/db.js';
import express from 'express';
import bodyParser from 'body-parser';

import jwt from 'jsonwebtoken'
const router = express.Router();
const jsonParser = bodyParser.json()


router.post('/create',jsonParser,async(req,res)=>{

    const existingCategory = await db.select().from(category).where(eq(category.category_name,req.body.category_name));
    if (existingCategory.length > 0) {
      res.status(400).send({err:"Category already exists."})
      return
    }
    await db.insert(category).values(
      [{category_name: req.body.category_name,
      deleted: 0
    }]
  );
    
  res.status(200).send({ message: "Category made." });
  })
  

  router.put('/delete',jsonParser,async(req,res)=>{
    const existingCategory = await db.select().from(category).where(eq(category.category_name,req.body.category_name));
  if (existingCategory.length <= 0) {
    res.status(400).send({err:"Category does not exist."})
    return
  }
    await db.update(category).set({deleted: '1'}).where(eq(category.category_name,req.body.category_name))
    res.status(200).send({message:"Category deleted."})

  })
export default router;
