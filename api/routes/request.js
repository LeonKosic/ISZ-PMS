
import { Name, eq, and, like } from 'drizzle-orm';
import { db } from '../db/db.js';
import express from 'express';
import jwt from 'jsonwebtoken'
import { authenticateToken } from "../middleware/auth.js"
import { category } from '../db/schema/category.js';
import { project } from '../db/schema/project.js';
import { post_category } from '../db/schema/post_category.js';
const router = express.Router();
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json();
import Joi from 'joi'
import { follow } from '../db/schema/follow.js';
import { post } from '../db/schema/post.js';
import { board } from '../db/schema/board.js';
import { checkIfTeamMember } from '../middleware/project.js';
import { project_members } from '../db/schema/project_members.js';
import { request } from '../db/schema/request.js';
import { request_answers } from '../db/schema/request_answers.js';


router.delete('/:id', jsonParser, async (req, res) => {
  const existingProject = await db.select().from(post).where(eq(post.id, req.params.id));
  if (existingProject.length <= 0) {
    res.send(400, { err: "Request with this name does not exist." })
    return
  }
  await db.update(post).set({ deleted: '1' }).where(eq(post.id, req.params.id))
  res.send(200, { message: "Request deleted." })
})

router.post('/', authenticateToken, jsonParser, async (req, res) => {

  const schema = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().optional(),
  })
  const options = {
    errors: {
      wrap: {
        label: false
      }
    }
  }
  console.log(req.body)
  const { error, value } = schema.validate(req.body, options);

  if (error) {
    res.send(400, { err: error.details })
    return
  }
  const newPost = await db.insert(post).values(
    [{
      ...req.body,
      deleted: 0,
      category_id:1,
      owner_id: req.user.id,
      type:1,
    }]
  );
  await db.insert(request).values([{id:newPost[0].insertId}])
  res.status(200).send({ message: "Project made." });
})

router.get('/my', authenticateToken, jsonParser, async (req, res) => {
  const projects = await db.select().from(post).where(and(eq(post.owner_id, req.user.id), eq(post.type,2)));

  res.status(200).json(projects)
})

router.get('/following', authenticateToken, jsonParser, async (req, res) => {
  const followingProjectNames = await db.select().from(post).leftJoin(follow, eq(post.owner_id, follow.following_id))
    .where(and(eq(follow.follower_id, req.user.id), eq(post.type,2)))
  res.status(200).send(followingProjectNames)
})
router.post('/solution', jsonParser, authenticateToken, async (req, res) => {
  await db.insert(request_answers).values({
    request: req.body.request_id,
    project: req.body.project_id,
  })
  res.status(200).send({ message: "Solution added." })
})
router.post('/search', jsonParser ,async(req,res)=>{
  const existingRequest = await db.select().from(post).where(and(like(post.title,`%${req.body.title}%`), eq(post.deleted,0), eq(post.type,2)));

  return res.send(200,existingRequest)
})

export default router