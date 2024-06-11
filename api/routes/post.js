
import { Name, eq, and } from 'drizzle-orm';
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
import { like } from '../db/schema/like.js';
import { comment } from '../db/schema/comment.js';

router.post('/category', jsonParser, async (req, res) => {
  await db.insert(post_category).values(
    [{
      category_id: req.body.category_id,
      post_id: req.body.project_id
    }])
  res.status(200).send({ message: "Project assigned to a category." })
})

router.delete('/:id', async (req, res) => {
  const existingProject = await db.select().from(post).where(eq(post.id, req.params.id));
  if (existingProject.length <= 0) {
    res.send(400, { err: "Post with this name does not exist." })
    return
  }
  await db.update(post).set({ deleted: '1' }).where(eq(post.id, req.params.id))
  res.send(200, { message: "Post deleted." })
})
router.get("/:id", authenticateToken, async (req, res) => {
  const existingProject = await db.select().from(post).where(eq(post.id, req.params.id));
  const comments = await db.select().from(comment).where(eq(comment.post, req.params.id));
  if (existingProject.length <= 0) {
    res.send(400, { err: "Post with this name does not exist." })
    return
  }
  res.send(200, {...existingProject[0], comments})
})

router.get('/my', authenticateToken, jsonParser, async (req, res) => {
  const posts = await db.select().from(post).where(eq(post.owner_id, req.user.id));
  res.status(200).json(posts)
})

router.get('/following', authenticateToken, jsonParser, async (req, res) => {
  const followingProjectNames = await db.select().from(post).leftJoin(follow, eq(post.owner_id, follow.following_id))
    .where(eq(follow.follower_id, req.user.id))
  res.status(200).send(followingProjectNames)

})
router.post('/like', authenticateToken, jsonParser, async (req, res) => {
  const prevState = await db.select().from(like).where(eq(like.post, req.body.id));
  let delta = req.body.status;
  if (prevState.length > 0) {
    delta -= prevState[0].status;
    if (req.body.status == 0) {
      delta = -prevState[0].status;
    }
  }
  await db.insert(like).values(
    [{
      post: req.body.id,
      user: req.user.id,
      status: req.body.status
    }])
  const existingProject = await db.select().from(post).where(eq(post.id, req.body.id));
  await db.update(post).set({ likes: existingProject[0].likes + delta }).where(eq(post.id, req.body.id))
})
router.post('/comment', authenticateToken, jsonParser, async (req, res) => {
  await db.insert(comment).values(
    [{
      body: req.body.body,
      user: req.user.id,
      post: req.body.post
    }])
  res.status(200).send({ message: "Comment added." })
})
export default router