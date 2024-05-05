
import { Name,eq,and} from 'drizzle-orm';
import {db} from '../db/db.js';
import express from 'express';
import jwt from 'jsonwebtoken'
import {authenticateToken} from "../middleware/auth.js"
import { category } from '../db/schema/category.js';
import { project } from '../db/schema/project.js';
import { project_category } from '../db/schema/project_category.js';

router.post('/category',jsonParser,async(req,res)=>{
    await db.insert(project_category).values(
      [{category_id: req.body.category_id,
      project_id: req.body.project_id
    }])
    res.status(200).send({message:"Project assigned to a category."})
  })

export default router