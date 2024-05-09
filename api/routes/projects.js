
import { Name,eq,and,} from 'drizzle-orm';
import {db} from '../db/db.js';
import express from 'express';
import jwt from 'jsonwebtoken'
import {authenticateToken} from "../middleware/auth.js"
import { category } from '../db/schema/category.js';
import { project } from '../db/schema/project.js';
import { project_category } from '../db/schema/project_category.js';
const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import Joi from 'joi'
import { follow } from '../db/schema/follow.js';

router.post('/category',jsonParser,async(req,res)=>{
    await db.insert(project_category).values(
      [{category_id: req.body.category_id,
      project_id: req.body.project_id
    }])
    res.status(200).send({message:"Project assigned to a category."})
  })

  router.put('/delete',jsonParser,async(req,res)=>{
    const existingProject = await db.select().from(project).where(eq(project.name,req.body.name));
  if (existingProject.length <= 0) {
    res.send(400,{err:"Project with this name does not exist."})
    return
  }
    await db.update(project).set({deleted: '1'}).where(eq(project.name,req.body.name))
    res.send(200,{message:"Project deleted."})

  })

  router.post('/create',authenticateToken,jsonParser,async(req,res)=>{

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
        const existingProject = await db.select().from(project).where(eq(project.name,req.body.name));
        if (existingProject.length > 0) {
          res.status(400).send({err:"Project with this name already exists."})
          return
        }
        await db.insert(project).values(
          [{name: req.body.name,
            deleted:0
        }]
      );
      res.status(200).send({ message: "Project made." });
      })

      router.get('/list',authenticateToken,jsonParser,async(req,res)=>{
        const projects= await db.select().from(project).where(eq(project.owner_id,req.user.id));
        if (projects.length <= 0) {
          res.send(400,{err:"User does not have any projects."})
          return
        }
        const projectNames = projects.map(project => project.name);
        res.send(projectNames);
      })

      // router.get('/users_projects',authenticateToken,jsonParser,async(req,res)=>{
      //   const followingProjectNames = await db.select('project.name').from('project').leftJoinoin('follow', eq(project.owner_id, follow.following_id))
      // .where(eq('follow.follower_id', req.user.id));
      // console.log(followingProjectNames)
      //   if (followingProjectNames.length <= 0) {
      //     res.send(400,{err:"No projects."})
      //     return
      //   }
      //   const projectNames = followingProjectNames.map(project => project.name);
      //   res.send(followingProjectNames)
        
      // })
export default router